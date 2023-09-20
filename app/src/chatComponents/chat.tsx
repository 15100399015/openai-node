"use client";

import { useChat, type Message } from "ai/react";

import { cn } from "@/lib/utils";
import { ChatList } from "@/chatComponents/chat-list";
import { ChatPanel } from "@/chatComponents/chat-panel";
import { EmptyScreen } from "@/chatComponents/empty-screen";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "ahooks";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [currentPlugin, setCurrentPlugin] = useState<string | null>(null);

  const {
    messages,
    append,
    reload,
    stop,
    setMessages,
    isLoading,
    input,
    setInput,
  } = useChat({
    api: "/api/chat",
    initialMessages,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    id,
    body: { id, plugin: currentPlugin },
    onResponse(response: any) {
      if (response.status === 401) {
        toast.error(response.statusText);
      }
    },
  });
  useUpdateEffect(() => {
    setMessages([]);
  }, [currentPlugin]);
  return (
    <div className="h-full flex flex-col">
      <div className={cn("flex-1 pt-10 md:pt-10 overflow-auto", className)}>
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        plugin={currentPlugin}
        setPlugin={setCurrentPlugin}
      />
    </div>
  );
}
