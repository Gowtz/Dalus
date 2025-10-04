"use client";
import React from "react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Paperclip, SendHorizonal, Ban, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipContent, Tooltip, TooltipTrigger } from "./ui/tooltip";
import type { ChatStatus } from "ai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChatModel, Models } from "@/lib/Models";

interface ChatBoxType {
  setMessages: any;
  status: ChatStatus;
  selectedModel: ChatModel;
  setSelectedModel: (model: ChatModel) => void;
}
export default function ChatBox({
  setMessages,
  status,
  selectedModel,
  setSelectedModel,
}: ChatBoxType) {
  const [inputmessage, setInputMessage] = useState("");
  function sendMessage() {
    setMessages({ text: inputmessage });
    setInputMessage("");
  }
  return (
    <>
      <div className="w-11/12 lg:w-[1000px] mx-auto bg-background border-input border my-5 max-h-72 flex flex-col rounded-lg overflow-hidden">
        <Textarea
          placeholder="Type Something"
          value={inputmessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="!text focus:outline-0 p-5 hide-scrollbar resize-none overflow-y-auto w-full min-h-[3rem] max-h-72 rounded-lg"
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        {/* Icons placeholder */}
        <div className="flex gap-3 p-2 justify-between items-center">
          <div className="pl-3 flex  items-center gap-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="cursor-not-allowed"
                  disabled={false}
                >
                  <Paperclip aria-disabled />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Document is comming soon</TooltipContent>
            </Tooltip>

            <SelectModal
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>

          {/* Send Button */}
          {status == "ready" ? (
            <Button variant={"default"} onClick={sendMessage}>
              <SendHorizonal />
            </Button>
          ) : (
            <Button variant="secondary">
              <Ban />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

function SelectModal({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: ChatModel;
  setSelectedModel: (model: ChatModel) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className=" py-2 px-4 rounded-lg hover:bg-accent cursor-pointer flex items-center">
          {selectedModel.name} <ChevronDown size={18} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[300px]" align="start">
        {Models.map((model, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => setSelectedModel(model)}
          >
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
