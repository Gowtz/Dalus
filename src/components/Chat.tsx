"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatBox from "./ChatInputBox";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import MessageView from "./MessageView";
import { SidebarTrigger } from "./ui/sidebar";
import { defaultModels } from "@/lib/Models";
import { useEffect, useRef, useState } from "react";
import { generateUUID } from "@/lib/utils";

export default function Chat({ id }: { id: string }) {
  const selectedModeRef = useRef(defaultModels);
  const [selectedModel, setSelectedModel] = useState(defaultModels);

  useEffect(() => {
    selectedModeRef.current = selectedModel;
    console.log("The seleceted mode is ", selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    console.log("The seleceted mode is ", selectedModeRef.current);
  }, [selectedModeRef]);

  const { messages, sendMessage, status } = useChat({
    id,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: {
            id,
            message: messages[messages.length - 1],
            selectedChatModel: selectedModeRef.current.id,
            ...body,
          },
        };
      },
    }),
  });
  return (
    <>
      <main className="flex h-lvh flex-col w-full">
        <div className="w-full h-20 flex py-7 justify-between px-5">
          <div>
            <SidebarTrigger className="cursor-pointer " />
          </div>
          <Button>
            <Plus /> <span>New tab</span>
          </Button>
        </div>
        <div className="container mx-auto w-full flex flex-col flex-1 min-h-0">
          <MessageView messages={messages} />
          <ChatBox
            setMessages={sendMessage}
            status={status}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>
      </main>
    </>
  );
}
