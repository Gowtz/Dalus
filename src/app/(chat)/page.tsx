"use client";
import Chat from "@/components/Chat";
import { generateUUID } from "@/lib/utils";

export default function Home() {
  const id = generateUUID();
  return <Chat id={id} />;
}
