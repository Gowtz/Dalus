import { customProvider } from "ai";
import { isDevelopmentEnv } from "@/lib/constants";
import { ollama } from "ollama-ai-provider-v2";
import { google } from "@ai-sdk/google";
import { Models } from "../Models";

export const myProvider = isDevelopmentEnv
  ? customProvider({
    languageModels: {
      ...Models.reduce<Record<string, ReturnType<typeof ollama|typeof google>>>(
        (acc, item) => {
          switch (item.provider) {
            case "ollama":
              acc[item.id] = ollama(item.id);
              break;
            case "google":
              acc[item.id] = google(item.id);
              break;
          }
          return acc;
        },
        {},
      ),
    },
  })
  : customProvider({
    languageModels: {
      ...Models.reduce<Record<string, ReturnType<typeof ollama|typeof google>>>(
        (acc, item) => {
          switch (item.provider) {
            case "ollama":
              acc[item.id] = ollama(item.id);
              break;
            case "google":
              acc[item.id] = google(item.id);
              break;
          }
          return acc;
        },
        {},
      ),
    },
  });
