"use client";

import AppShell from "./components/AppShell";
import { useUser } from "./context/UsersContext";
import User from "./components/User";

export default function Home() {
  const { user } = useUser();

  return (
    <main>

      {!user ? <User /> : <AppShell />}

      {/* 🔥 SEO CONTENT START */}
      <section className="p-6 text-gray-300 space-y-6">

        <h1 className="text-3xl font-bold text-white">
          ShadowChat - Anonymous Real-Time Chat App
        </h1>

        <p>
          ShadowChat is a powerful anonymous chat platform that allows users to
          connect and talk with strangers worldwide instantly. Built with modern
          technology, ShadowChat provides fast, secure, and real-time messaging
          without requiring any login or personal information.
        </p>

        <p>
          Whether you want to make new friends, have random conversations, or
          explore global communication, ShadowChat offers a seamless experience
          with privacy and speed at its core.
        </p>

        <h2 className="text-2xl font-semibold text-white">
          Why Choose ShadowChat?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Anonymous chatting without registration</li>
          <li>Instant real-time messaging system</li>
          <li>Secure and private conversations</li>
          <li>Modern UI with fast performance</li>
          <li>Works on mobile and desktop devices</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white">
          Features of ShadowChat
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Connect with strangers globally</li>
          <li>High-speed real-time chat experience</li>
          <li>No data storage for better privacy</li>
          <li>Simple and clean user interface</li>
          <li>Secure communication channels</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white">
          How ShadowChat Works
        </h2>

        <p>
          ShadowChat connects users randomly across the world using a real-time
          communication system. Once you open the app, you are instantly matched
          with another user, allowing you to start chatting immediately without
          any signup process.
        </p>

        <p>
          The platform ensures privacy by not storing personal data, making it a
          safe and anonymous environment for conversations.
        </p>

        <h2 className="text-2xl font-semibold text-white">
          Benefits of Anonymous Chat
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Freedom to express thoughts openly</li>
          <li>No pressure of identity or profile</li>
          <li>Meet people from different cultures</li>
          <li>Safe and private communication</li>
        </ul>

      </section>
    </main>
  );
}