import { type Message } from "ai";

import { Separator } from "@/chatComponents/ui/separator";
import { ChatMessage } from "@/chatComponents/chat-message";
import { useEffect, useRef } from "react";

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages }: ChatList) {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!elementRef.current) return;
    const parent = elementRef.current.parentElement as HTMLDivElement;
    const resizeObserver = new ResizeObserver((entrys) => {
      for (const entry of entrys) {
        if (entry.contentRect) {
          parent.scrollTo({ top: entry.contentRect.height });
        }
      }
    });
    resizeObserver.observe(elementRef.current, { box: "content-box" });
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  if (!messages.length) {
    return null;
  }

  return (
    <div ref={elementRef} className="relative mx-auto max-w-2xl px-4 pb-8">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
