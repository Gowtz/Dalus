import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ChatMessage} from "./type"
import {DBMessage} from './db/schema'
import { UIDataTypes, UIMessagePart } from "ai"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts as UIMessagePart<UIDataTypes,any>[], 
    metadata: {
      createdAt:message.createdAt,
    },
  }));
}
