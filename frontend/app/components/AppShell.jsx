"use client";

import { useState } from "react";
import GlobalChat from "./GlobalChat";
import OneToOneChat from "./OneToOneChat";

import ArchPanel from "./ArchPanel";

export default function AppShell() {
  const [tab, setTab] = useState("global");

  const tabs = [
    { id: "global", label: "🌍 Global Room" },
    { id: "one2one", label: "💬 1-on-1" },
    { id: "arch", label: "⚙️ How it works" },
  ];

  return (
    <div className="bg-[#080810] min-h-screen text-white flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full px-5 pt-4 flex justify-between items-center">
        <div>
          <div className="text-lg font-extrabold tracking-tight">
            <span className="text-green-400">SHADOW</span>
            <span className="text-blue-400">CHAT</span>
          </div>
          <p className="text-[10px] text-gray-500">
            Anonymous Chat
          </p>
        </div>

        <div className="text-[8px] text-gray-600 text-right">
          Developed By Shanu Chhetri
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full lg:max-w-[600px] mt-4 bg-[#0d0d1a] px-2 md:px-0 md:border md:border-gray-800 rounded-2xl flex flex-col h-[85vh] overflow-hidden">

        {/* TABS */}
        <div className="flex w-full border-b border-gray-800">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-xs transition ${
                tab === t.id
                  ? "text-white font-semibold border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden">
          {tab === "global" && <GlobalChat />}

          {tab === "one2one" && (
            <OneToOneChat/>
          )}

          {tab === "arch" && (
            <ArchPanel/>
          )}
        </div>
      </div>
    </div>
  );
}