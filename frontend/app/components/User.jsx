"use client";

import { useState } from "react";

import {useUser} from "../context/UsersContext";



export default function User() {
  const [name, setName] = useState("");
    const { SetUser , saveUser} = useUser();
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#0d0d1a] p-6 rounded-xl border border-gray-800 w-[300px]">
        <h2 className="text-lg mb-4 text-center">Enter Username</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          className="w-full px-3 py-2 rounded bg-black border border-gray-700"
        />

        <button
          onClick={() =>saveUser(name)}
          className="mt-4 w-full bg-blue-500 py-2 rounded"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}