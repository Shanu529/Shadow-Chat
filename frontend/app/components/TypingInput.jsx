"use client";

import { useState } from "react";

export default function TypingInput({ onSend, placeholder, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;

    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-800 bg-[#0d0d1a]">
      
      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={placeholder || "Type a message..."}
        disabled={disabled}
        className="flex-1 bg-[#1a1a2e] border border-gray-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-40"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition 
        ${
          text.trim() && !disabled
            ? "bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105"
            : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        ➤
      </button>
    </div>
  );
}