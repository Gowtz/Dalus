"use client"
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
    <main className="flex h-screen flex-col">
      <div className="container mx-auto w-full flex flex-col flex-1 min-h-0">
        <h1 className="text-4xl font-bold text-center ">Welcome to the Home Page</h1>


        <div className="overflow-y-auto message flex-1 min-h-0 hide-scrollbar">

          {messages.map((m) => (
            <div key={m.id} className="p-2 prose dark:prose-invert max-w-none ">
              <MarkDownView>
                {m.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('')}
              </MarkDownView>

            </div>
          ))}
        </div>

      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          sendMessage({ text: input })
          setInput("")
          window.history.replaceState({}, "", `/chat/${id}`)
        }
      }}>
        <input type="text" placeholder="You Question here"
          className="p-7 border-2 rounded-xl w-[700px]"
          onChange={e => setInput(e.target.value)} />
      </form>

    </main>
  );
}
