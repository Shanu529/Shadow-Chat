"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingInput from "./TypingInput";

import {socket} from "../lib/socket"


export default function GlobalChat() {
  const myId = 12684;

  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 222,
      text: "Welcome to ShadowChat 🌍",
      username: "System",
      ts: Date.now(),
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    const newMsg = {
      id: Date.now(),
      userId: myId,
      text,
      username: "Me",
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  useEffect(()=>{
    socket.connect();

    // socket connection...
    socket.on("connect",()=>{
        console.log("soket connected", socket.id);
    })
    // socket error throw
    socket.on("connect_error",(error)=>{
        console.log("socket errror found..", error);
        
    })
    return ()=>{
        // socket disconnection...
        socket.disconnect();
    console.log("soket disconnected..", socket.id);
    }
    
  },[])

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0d0d1a]/80 backdrop-blur-md">
        <div>
          <h2 className="text-sm font-semibold">🌍 Global Chat</h2>
          <p className="text-xs text-gray-400">
            Messages disappear in 24 hours
          </p>
        </div>

        <div className="flex items-center gap-2 text-green-400 text-xs bg-[#1e1e2e] px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          32 online
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">

        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No messages yet...
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isOwn={msg.userId === myId}
          />
        ))}

       
       <div ref={bottomRef} />
      </div>

      
      <TypingInput onSend={handleSend} placeholder="Typing..." disabled={false}/>
    </div>
  );
}