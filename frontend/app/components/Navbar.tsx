"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-gray-800 bg-[#0d0d1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.ico" alt="logo" width={28} height={28} />
            <span className="font-bold text-white text-base sm:text-lg">
              Shadow Chat
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
          </div>

          {/* Desktop Button */}
          <Link
            href="/"
            className="hidden md:block bg-gradient-to-r from-blue-500 to-green-400 px-4 py-1.5 rounded-full text-xs font-semibold text-white"
          >
            Start Chat
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] max-w-[280px] bg-[#0d0d1a] z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <span className="text-white font-bold">Menu</span>
          <button onClick={() => setOpen(false)} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 px-4 py-6 text-gray-300">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/privacy" onClick={() => setOpen(false)}>
            Privacy
          </Link>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="mt-4 bg-gradient-to-r from-blue-500 to-green-400 px-4 py-2 rounded-full text-xs font-semibold text-white text-center"
          >
            Start Chat
          </Link>
        </div>
      </div>
    </>
  );
}