"use client";

import {v4 as uuidv4} from "uuid"
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingInput from "./TypingInput";

import {socket} from "../lib/socket"

import {useLayoutEffect} from "react"
export default function GlobalChat() {
  // const myId = 12684;
  const [myId] = useState(() =>
  Math.random().toString(36).slice(2, 9)
);

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  const [username, setUsername] = useState();

 useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView();   
  }, [messages.length]);

  const handleSend = (text) => {
    const newMsg = {
      id: uuidv4(),
      userId: myId,
      text,
      username: username ||"Shadow" ,
      ts: Date.now(),
    };
    socket.emit("message_send",newMsg);
  };


    useEffect(() => {
  if (!socket.connected) {
    socket.connect();
  }

  // listen first
  socket.on("global_history", (msg) => {
    console.log("history received", msg);
    setMessages(msg);
  });

  socket.on("message_receive", (msg) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  });

  // 🔥 IMPORTANT
  socket.on("connect", () => {
    console.log("connected", socket.id);
    socket.emit("join_global"); //  guaranteed
  });

  // also handle already connected
  if (socket.connected) {
    socket.emit("join_global");
  }

  return () => {
    socket.off("global_history");
    socket.off("message_receive");
    socket.off("connect");
  };
}, []);


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