export interface ChatModel {
  id: string;
  name: string;
}
export const Models: ChatModel[] = [
  {
    name: "llama3.1",
    id: "llama3.1",
  },
  {
    id: "mistral",
    name: "mistral",
  },
  {
    id: "qwen2.5-coder:1.5b",
    name: "qwen2.5-coder:1.5b",
  },
  {
    id: "qwen2.5-coder:3b",
    name: "qwen2.5-coder:3b",
  },
  {
    id: "gemma3",
    name: "gemma3",
  },
];
export const defaultModels: ChatModel = Models[0];
