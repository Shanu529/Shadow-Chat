
"use client";

import { io } from "socket.io-client";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL


console.log("here is backend url:",URL)

export const socket = io(URL, {
    autoConnect: false,
})