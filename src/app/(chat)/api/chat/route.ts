import { convertToModelMessages, streamText } from "ai";
import { ollama } from "ollama-ai-provider-v2";

export async function POST(request: Request) {
    const {messages} = await request.json();
    const result = streamText({
            model:ollama('qwen2.5-coder:1.5b'),
        messages:convertToModelMessages(messages)
    });

   return result.toUIMessageStreamResponse() 
}