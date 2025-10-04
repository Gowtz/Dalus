import { customProvider } from "ai";
import { isDevelopmentEnv } from "@/lib/constants";
import { ollama } from "ollama-ai-provider-v2";
import { Models } from "../Models";

export const myProvider = isDevelopmentEnv
  ? customProvider({
      languageModels: {
        ...Models.reduce<Record<string, ReturnType<typeof ollama>>>(
          (acc, item) => {
            acc[item.id] = ollama(item.id);
            return acc;
          },
          {},
        ),
      },
    })
  : customProvider({
      languageModels: {
        // "chat-model": ollama("llama3.1:latest"),
        // "chat-model-reasoning": ollama("llama3.1:latest"),
        // "title-model": ollama("gemma3:latest"),
        // "artifact-model": ollama("llama3.1:latest"),
      },
    });
