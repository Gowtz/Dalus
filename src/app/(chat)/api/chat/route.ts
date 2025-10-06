import { myProvider } from "@/lib/ai/provider";
import { getChatByChatId, getMessagesByChatId, saveChat } from "@/lib/db/quires";
import { PostRequestBody } from "@/lib/schema";
import { convertToUIMessages } from "@/lib/utils";
import { convertToModelMessages, streamText } from "ai";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { message, selectedChatModel, id }: PostRequestBody = requestBody;
  const existChat = getChatByChatId({id})

  if(!existChat){
  await saveChat({
    id,
    title: `This is random ${id}`,
  });
  }
  const messageFromDataBase = await getMessagesByChatId({ id });
  const messages = [...convertToUIMessages(messageFromDataBase), message];


  const result = streamText({
    model: myProvider.languageModel(selectedChatModel),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
