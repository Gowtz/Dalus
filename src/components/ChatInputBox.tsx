"use client";
import React from "react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Paperclip, SendHorizonal, Ban } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipContent, Tooltip, TooltipTrigger } from "./ui/tooltip";
import type { ChatStatus } from "ai";

interface ChatBoxType {
  setMessages: any;
  status: ChatStatus;
}
export default function ChatBox({ setMessages, status }: ChatBoxType) {
  const [inputmessage, setInputMessage] = useState("");
  function sendMessage() {
    setMessages({text:inputmessage});
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
              setInputMessage("");
            }
          }}
        />

        {/* Icons placeholder */}
        <div className="flex gap-3 p-2 justify-between items-center">
          <div className="pl-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="cursor-not-allowed"
                  disabled={false}
                  onClick={sendMessage}
                >
                  <Paperclip aria-disabled />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Document is comming soon</TooltipContent>
            </Tooltip>
          </div>

          {/* Send Button */}
          {status == "ready" ? (
            <Button variant={"default"}>
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
