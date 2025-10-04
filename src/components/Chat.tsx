"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatBox from "./ChatInputBox";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import MessageView from "./MessageView";

export default function Chat({ id }: { id: string }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  return (
    <>
      <main className="flex h-screen flex-col">
        <div className="w-full h-20 flex py-7 justify-end px-5">
          <Button>
            <Plus /> <span>New tab</span>
          </Button>
        </div>
        <div className="container mx-auto w-full flex flex-col flex-1 min-h-0">
          <MessageView messages={messages} />
          <ChatBox setMessages={sendMessage} status={status} />
        </div>
      </main>
    </>
  );
}
