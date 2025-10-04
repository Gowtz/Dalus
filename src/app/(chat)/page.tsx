"use client"
import Chat from "@/components/Chat";
import MarkDownView from "@/components/MarkDownView";
import { generateUUID } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";


export default function Home() {
  const [input, setInput] = useState("")
  const id = generateUUID()
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    })
  }
  )
  return (
  <Chat id={id} />
  );
}
