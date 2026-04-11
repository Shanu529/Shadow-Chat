
import dotenv from "dotenv";
dotenv.config();


import express from 'express';

import http from 'http';

import { Server } from 'socket.io';

import cors from "cors";

import Redis from "ioredis";


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});


console.log("here is host",process.env.HOST);
console.log("here is password",process.env.PASSWORD);
console.log("here is username",process.env.MY_USERNAME);
console.log("here is port",process.env.PORT);


// socket conneted
// const redis = new Redis();

const redis = new Redis({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.MY_USERNAME,
    password: process.env.PASSWORD,
});



redis.on("connect", () => {
    console.log("redis runnnning");

})
redis.on("error", (error) => {
    console.log("error at redis", error);

})

let waitinguser = null;
let userRoom = {};

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // global joinning
    socket.on("join_global", async () => {

        socket.join("global");
        try {

            const message = []

            // get 50 messages;
            const msgId = await redis.lrange("global_chat", 0, 49);

            for (let id of msgId) {

                const data = await redis.get(id);
                if (data) {
                    message.push(JSON.parse(data));
                } else {
                    await redis.lrem("global_chat", 0, id);
                }
            }

            socket.emit("global_history", message.reverse());
            console.log("history sending:", message);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    })
    // send message in global
    socket.on("message_send", async (msg) => {
        const message = {
            ...msg,
            ts: Date.now()
        }

        try {

            const messageId = `msg${Date.now()}` // msg key
            await redis.set(messageId, JSON.stringify(message)); // store key 
            // store in redis

            await redis.expire(messageId, 18000);
            await redis.lpush("global_chat", messageId);
            await redis.ltrim("global_chat", 0, 99);

            // const ttl = await redis.ttl("global_chat");
            //  set TTL (5 hours = 18000 sec)
            // const ttl = await redis.ttl("global_chat");
            // if (ttl === -1) {
            //     await redis.expire("global_chat", 18000);
            // }

            // broadcast message
            await io.to("global").emit("message_receive", message);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    })


    socket.on("find_partner", () => {

        if (waitinguser && waitinguser != socket.id) {
            const roomId = `room${Date.now()}`

            // create partner
            const partner = io.sockets.sockets.get(waitinguser);
            if (partner) {
                socket.join(roomId);
                partner.join(roomId);

                userRoom[socket.id] = roomId;
                userRoom[partner.id] = roomId;
                socket.emit("matched", { roomId });
                partner.emit("matched", { roomId });
                waitinguser = null;
            }

        } else {
            waitinguser = socket.id;
            socket.emit("waiting");
        }

    })

    socket.on("send_dm", ({ roomId, message }) => {
        socket.to(roomId).emit("receive_dm", message);
    })

    socket.on("leave_chat", () => {
        const roomId = userRoom[socket.id];

        if (!roomId) return;

        // notify partner
        socket.to(roomId).emit("partner_left");

        // remove all sockets from room
        io.in(roomId).socketsLeave(roomId);

        // cleanup ALL users from mapping
        for (let id in userRoom) {
            if (userRoom[id] === roomId) {
                delete userRoom[id];
            }
        }

        console.log("room cleaned:", roomId);
    });

    socket.on("disconnect", () => {
        const roomId = userRoom[socket.id];

        if (roomId) {
            socket.to(roomId).emit("partner_left");

            io.in(roomId).socketsLeave(roomId);

            for (let id in userRoom) {
                if (userRoom[id] === roomId) {
                    delete userRoom[id];
                }
            }

            console.log("room removed due to disconnect:", roomId);
        }

        if (waitinguser === socket.id) {
            waitinguser = null;
        }

        console.log("user disconnected", socket.id);
    });

});

server.listen(4000, () => {
    console.log("server is running...");
})