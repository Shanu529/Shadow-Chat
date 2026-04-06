

import exprss from 'express';

import http from 'http';

import { Server } from 'socket.io';

import cors from "cors";

const app = exprss();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin : "*"
    },
});

// socket conneted

io.on("connection",(socket)=>{
    console.log("user connected", socket.id);

    return socket.on("disconnected",()=>{
        console.log("user disconnected", socket.id);
    });
});

server.listen(4000,()=>{
    console.log("server is running...");
})