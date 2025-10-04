import { isDevelopmentEnv } from "./constants";

export interface ChatModel {
  id: string;
  name: string;
  provider: "ollama" | "google" | "openai" | "grok" | "anthropic";
}
export const devModels: ChatModel[] = [
  {
    name: "llama3.1",
    id: "llama3.1",
    provider: "ollama",
  },
  {
    id: "mistral",
    name: "mistral",
    provider: "ollama",
  },
  {
    id: "qwen2.5-coder:1.5b",
    name: "qwen2.5-coder:1.5b",
    provider: "ollama",
  },
  {
    id: "qwen2.5-coder:3b",
    name: "qwen2.5-coder:3b",
    provider: "ollama",
  },
  {
    id: "gemma3",
    name: "gemma3",
    provider: "ollama",
  },
];

export const productionModels: ChatModel[] = [
  {
    name: "google 2.5 pro",
    id: "google 2.5 pro",
    provider: "google",
  },

  {
    name: "google 2.5 Flash",
    id: "google 2.5 Flash",
    provider: "google",
  },
  {
    name: "google 2.5 Flash lite",
    id: "google 2.5 Flash lite",
    provider: "google",
  },
];

export const Models: ChatModel[] = isDevelopmentEnv ? devModels : [];
export const defaultModels: ChatModel = Models[0];
