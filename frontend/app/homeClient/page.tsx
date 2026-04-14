
"use client"

import AppShell from "../components/AppShell";
import { useUser } from "../context/UsersContext";
import User from "../components/User";

export default function HomeClient() {
  const { user } = useUser();

  return !user ? <User /> : <AppShell />;
}
