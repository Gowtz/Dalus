import { myProvider } from "@/lib/ai/provider";
import {
  getChatByChatId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
} from "@/lib/db/quires";
import { PostRequestBody } from "@/lib/schema";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import {
  convertToModelMessages,
  createUIMessageStream,
  streamText,
  smoothStream,
  JsonToSseTransformStream,
} from "ai";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { message, selectedChatModel, id }: PostRequestBody = requestBody;
  const existChat = await getChatByChatId({ id });

  if (!existChat) {
    await saveChat({
      id,
      title: `This is ${id}`,
    });
  }

  await saveMessages({
    messages: [
      {
        chatId: id,
        id: message.id,
        parts: message.parts,
        role: "user",
        createdAt: new Date(),
      },
    ],
  });

  const messageFromDataBase = await getMessagesByChatId({ id });
  const messages = [...convertToUIMessages(messageFromDataBase), message];

  const stream = createUIMessageStream({
    execute: ({ writer: dataStream }) => {
      const result = streamText({
        model: myProvider.languageModel(selectedChatModel),
        messages: convertToModelMessages(messages),
        experimental_transform: smoothStream({ chunking: "word" }),
      });

      result.consumeStream();

      dataStream.merge(
        result.toUIMessageStream({
          sendReasoning: true,
        }),
      );
    },

    generateId: generateUUID,
    onFinish: async ({ messages }) => {
      await saveMessages({
        messages: messages.map((message) => ({
          id: message.id,
          role: message.role,
          parts: message.parts,
          createdAt: new Date(),
          attachments: [],
          chatId: id,
        })),
      });
    },
  });

  return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  // return result.toUIMessageStreamResponse();
}
