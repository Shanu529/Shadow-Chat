"use client";

import AppShell from "./components/AppShell";

import{useUser} from "./context/UsersContext";

import User from "./components/User";

export default function Home() {
  const { user } = useUser();
  if (!user) {
    return <User />;
  }
  return <AppShell />;
}
