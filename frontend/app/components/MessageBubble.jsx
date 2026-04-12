"use client";

import Avatar from "./Avatar";

export default function MessageBubble({ msg, isOwn }) {
    // console.log("here is msg",msg.username)
  return (
    <div
      className={`flex gap-2 items-end mb-3 ${
        isOwn ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      { !isOwn && (
        <Avatar
          name={
            typeof msg.username === "string"
              ? msg.username
              : msg.username?.username || "Shadow"
          }
        />
      )}

      {/* Message Content */}
      <div
        className={`max-w-[70%] flex flex-col ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        {/* Username */}
        {!isOwn && (
          <span>
          {typeof msg.username === "string"
            ? msg.username
            : msg.username?.username || "Shadow"}
        </span>
        )}

        {/* Message Box */}
        <div
          className={`px-4 py-2 text-sm rounded-2xl break-words ${
            isOwn
              ? "bg-gradient-to-r from-gray-800 to-blue-500 text-white rounded-br-sm"
              : "bg-[#1e1e2e] text-white border border-gray-700 rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-gray-500 mt-1 ml-1">
          {timeAgo(msg.ts)} time
        </span>
      </div>
    </div>
  );
}

/* Utility function */
function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}