

import express from 'express';

import http from 'http';

import { Server } from 'socket.io';

import cors from "cors";

import Redis from "ioredis";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

// socket conneted
// const redis = new Redis();

const redis = new Redis({
    host: "redis-16998.crce206.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 16998,
    username: "default",
    password: "T8MSs9KIib895ygjeuLWhzDH0mCfImr7",
});

redis.on("connect", () => {
    console.log("redis runnnning");

})
redis.on("error", (error) => {
    console.log("error at redis", error);

})

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // global joinning
    socket.on("join_global", async () => {

        socket.join("global");
        try {
            // get 50 message
            const msg = await redis.lrange("global_chat", 0, 49);
            const parsed = msg.map((m) => JSON.parse(m)).reverse();
            socket.emit("global_history", parsed); 
            console.log("history sending:", parsed);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    })

    // send message in global

    socket.on("message_send", async (msg) => {
        const message = {
            ...msg,
            id: Date.now(),
            ts: Date.now() 
        }

        try {
            // store in redis
            await redis.lpush("global_chat", JSON.stringify(message));
            await redis.ltrim("global_chat", 0, 99);

            //  set TTL (5 hours = 18000 sec)
            const ttl = await redis.ttl("global_chat");
            if (ttl === -1) {
                await redis.expire("global_chat", 18000);
            }
            // broadcast message
            await io.to("global").emit("message_receive", message);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    })


    // disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

    })


    socket.on("find_partner",()=>{
        const waitinguser = null;

        if( waitinguser && waitinguser != socket.id){
            const roomId = `room${Date.now()}`
            
            // create partner
            const partner = io.sockets.sockets.get(waitinguser);
            if(partner){
                socket.join(roomId);
                partner.join(roomId);
            }
            waitinguser = null;
        } else{
            waitinguser = socket.id;
            socket.emit("waiting_for_partner");
        }

    })

    socket.on("send_dm",({roomId, message})=>{
        socket.to(roomId).emit("recive_dm", message)
    })

    socket.on("disconnect",()=>{
        if(waitinguser && waitinguser == socket.id){
            waitinguser = null;
        }
    });

});

server.listen(4000, () => {
    console.log("server is running...");
})