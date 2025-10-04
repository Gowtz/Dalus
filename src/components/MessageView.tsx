import MarkDownView from "@/components/MarkDownView";
import { UIMessage } from "ai";
import { Greetings } from "./Greatings";
import { cn } from "@/lib/utils";
interface MessageView {
  messages: UIMessage[];
}
export default function MessageView({ messages }: MessageView) {
  if (messages.length == 0) return <Greetings />;
  return (
    <div className="overflow-y-auto message flex-1 min-h-0 hide-scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-2 prose dark:prose-invert max-w-6xl mx-auto px-7"
        >
          {message.role == "user" ? (
            <div
              className={cn("flex items-start gap-3 w-full my-24", {
                "justify-end text-secondary": message.role === "user",
                "justify-start": message.role !== "user",
              })}
            >
              <div className="inline-block bg-blue-500 text-secondary-foreground p-2 px-4 rounded-lg">
                {message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("")}
              </div>
            </div>
          ) : (
            <MarkDownView>
              {message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("")}
            </MarkDownView>
          )}
        </div>
      ))}
    </div>
  );
}
