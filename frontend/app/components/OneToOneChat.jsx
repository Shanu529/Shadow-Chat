"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingInput from "./TypingInput";
import { socket } from "../lib/socket";

export default function OneToOneChat() {
  const [myId] = useState(() =>
    Math.random().toString(36).slice(2, 9)
  );

  const [phase, setPhase] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("waiting", () => {
      setPhase("waiting");
    });

    socket.on("matched", ({ roomId }) => {
      setRoomId(roomId);
      setPhase("chatting");

      setMessages([
        {
          id: Date.now(),
          from: "system",
          text: "🎉 You're connected! Say hi.",
          ts: Date.now(),
        },
      ]);
    });

    socket.on("receive_dm", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

      socket.on("partner_left",()=>{
      setPhase("idle");
      setMessages([]);
      alert("Stranger disconnected")
    })

    return () => {
      socket.off("waiting");
      socket.off("matched");
      socket.off("receive_dm");
      socket.off("partner_left");
    };
  }, []);
    useEffect(() => {
      return () => {
            console.log("leave chat useeffect running...");
            
          if (socket.connected) {
            socket.emit("leave_chat");
          }
        };
    },[]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const startChat = () => {
    socket.emit("find_partner");
    setPhase("waiting");
  };

  const send = (text) => {
    const msg = {
      id: Date.now(),
      from: myId,
      text,
      ts: Date.now(),
    };

    socket.emit("send_dm", {
      roomId,
      message: msg,
    });

    setMessages((prev) => [...prev, msg]);
  };

  const stop = () => {
    socket.emit("leave_chat");
    console.log("leave chat called...");
    
    setPhase("idle");
    setMessages([]);
    setRoomId(null);
  };


  return (
    <div className="flex flex-col h-full bg-black text-white">

      <div className="px-4 py-3 border-b border-gray-800 flex justify-between">
        <div>
          <h2 className="text-sm font-semibold">⚡ Random Chat</h2>
          <p className="text-xs text-gray-400">
            {phase === "idle" && "Talk to a stranger"}
            {phase === "waiting" && "Finding someone..."}
            {phase === "chatting" && "Connected"}
          </p>
        </div>

        {phase === "chatting" && (
          <button onClick={stop} className="text-red-400 text-xs">
            Stop
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col">

        {phase === "idle" && (
          <div className="flex-1 flex items-center justify-center">
            <button onClick={startChat} className="bg-green-500 px-6 py-2 rounded-full">
              Start Chat
            </button>
          </div>
        )}

        {phase === "waiting" && (
          <div className="flex-1 flex items-center justify-center">
            Finding partner...
          </div>
        )}

        {phase === "chatting" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((m) =>
                m.from === "system" ? (
                  <div key={m.id} className="text-center text-blue-400 text-xs">
                    {m.text}
                  </div>
                ) : (
                  <MessageBubble
                    key={m.id}
                    msg={{ ...m, username: m.from }}
                    isOwn={m.from === myId}
                  />
                )
              )}
              <div ref={bottomRef} />
            </div>

            <TypingInput onSend={send} />
          </>
        )}
      </div>
    </div>
  );
}