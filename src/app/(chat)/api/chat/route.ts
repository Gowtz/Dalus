import { myProvider } from "@/lib/ai/provider";
import { PostRequestBody } from "@/lib/schema";
import { convertToModelMessages, streamText } from "ai";

export async function POST(request: Request) {

  const requestBody = await request.json();
  const { messages, selectedChatModel ,id}:PostRequestBody= requestBody;
  const result = streamText({
    model: myProvider.languageModel(selectedChatModel),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
