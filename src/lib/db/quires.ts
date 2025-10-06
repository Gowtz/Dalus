import { asc, eq } from "drizzle-orm";
import { chat, message } from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DBMessage } from "./schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function saveChat({ id, title }: { id: string; title: string }) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      title,
    });
  } catch (error) {
    throw new Error("Database Error");
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<DBMessage>;
}) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.log("This is Error ", error);
    throw new Error("bad_request:database");
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.log("There error is ", error);
    throw new Error("Database Error");
  }
}

export async function getChatByChatId({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    throw new Error("bad_request:database");
  }
}
