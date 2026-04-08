

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

const redis = new Redis();
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // global joinning
    socket.on("join_global", async () => {

        socket.join("global");
        try {
            // get 50 message
            const msg = await redis.lrange("global_chat", 0, 49);
            const parsed = msg.map((m) => JSON.parse(m)).reverse();
            socket.emit("global_histry", parsed);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    })
    // send message in global
    socket.on(() => {
        socket.on("message_send", async (msg) => {
            const message = msg = {
                ...msg,
                id: Date.now(),
                tl: Date.now(),
            }

            try {
                // store in redis
                await redis.lpush("global_chat", JSON.stringify(message));
                await redis.ltrim("global_chat", 0, 99);

                //  set TTL (24 hours = 86400 sec)
                await redis.expire("global_chat", 86400);

                // broadcast message
                await io.to("global").emit("message_receive", message);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        })
    })

    // disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

    })

});

server.listen(4000, () => {
    console.log("server is running...");
})