"use client"
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";


export default function Home() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat({
        transport: new DefaultChatTransport({
      api: '/api/chat',
    })}
  )
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="container mx-auto">

        <h1 className="text-4xl font-bold text-center">Welcome to the Home Page</h1>

        <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}


        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          sendMessage({ text: input })
          setInput("")
        }
      }}>
        <input type="text" placeholder="You Question here"
          className="p-7 border-2 rounded-xl w-[700px]"
          onChange={e => setInput(e.target.value)} />
      </form>
    </main>
  );
}
