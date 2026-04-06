"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingInput from "./TypingInput";

export default function OneToOneChat() {
  const myId = "me";
  const myName = "You";

  const [phase, setPhase] = useState("idle");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  //  AUTO MATCH (simulate)
  useEffect(() => {
    if (phase === "waiting") {
      const timer = setTimeout(() => {
        setPhase("chatting");

        // first system message
        setMessages([
          {
            id: Date.now(),
            from: "system",
            text: "🎉 You're connected! Say hi.",
            ts: Date.now(),
          },
        ]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [phase]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const send = (text) => {
    const msg = {
      id: Date.now(),
      from: myName,
      text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, msg]);

    //  fake reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "Stranger",
          text: "Interesting... 👀",
          ts: Date.now(),
        },
      ]);
    }, 1000);
  };

  //  STOP CHAT
  const stop = () => {
    setPhase("idle");
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">

      {/*  HEADER */}
      <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold">⚡ Random Chat</h2>
          <p className="text-xs text-gray-400">
            {phase === "idle" && "Talk to a stranger"}
            {phase === "waiting" && "Finding someone..."}
            {phase === "chatting" && "Connected to stranger"}
          </p>
        </div>

        {phase === "chatting" && (
          <button
            onClick={stop}
            className="text-red-400 border border-red-400 px-3 py-1 rounded-full text-xs"
          >
            Stop
          </button>
        )}
      </div>

      {/*  BODY */}
      <div className="flex-1 flex flex-col">

        {/*  IDLE */}
        {phase === "idle" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-5xl">🎲</div>
            <p className="text-gray-400 text-sm text-center">
              Meet a random stranger anonymously
            </p>

            <button
              onClick={() => setPhase("waiting")}
              className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-full font-semibold"
            >
              Start Chatting →
            </button>
          </div>
        )}

        {/* 🔍 WAITING */}
        {phase === "waiting" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-4xl animate-spin">🔍</div>
            <p className="text-gray-400">Searching for a stranger...</p>

            <button
              onClick={() => setPhase("idle")}
              className="text-red-400 border border-red-400 px-4 py-1 rounded-full text-sm"
            >
              Cancel
            </button>
          </div>
        )}

        {/* CHATTING */}
        {phase === "chatting" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((m) =>
                m.from === "system" ? (
                  <div
                    key={m.id}
                    className="text-center text-blue-400 text-xs"
                  >
                    {m.text}
                  </div>
                ) : (
                  <MessageBubble
                    key={m.id}
                    msg={{ ...m, username: m.from }}
                    isOwn={m.from === myName}
                  />
                )
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <TypingInput onSend={send} />
          </>
        )}
      </div>
    </div>
  );
}