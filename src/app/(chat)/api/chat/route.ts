import { myProvider } from "@/lib/ai/provider";
import { convertToModelMessages, streamText } from "ai";
import { ollama } from "ollama-ai-provider-v2";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { messages, selectedChatModel } = requestBody;
  console.log(JSON.stringify(selectedChatModel["id"]))
  const result = streamText({
    model: myProvider.languageModel(selectedChatModel["id"]),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
