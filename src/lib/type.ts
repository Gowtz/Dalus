import type { UIMessagePart } from "ai";

export type ChatMessage = UIMessage;

export type UIMessage<Part = UIMessagePart<any, any>, Tool = any> = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: Part[];
  metadata?: Record<string, any>;
  tools?: Tool[];
};
