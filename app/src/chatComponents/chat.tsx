"use client";

import { useChat, type Message } from "ai/react";

import { cn } from "@/lib/utils";
import { ChatList } from "@/chatComponents/chat-list";
import { ChatPanel } from "@/chatComponents/chat-panel";
import { EmptyScreen } from "@/chatComponents/empty-screen";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useState } from "react";

const plugins = [
  {
    label: "视图助手",
    value: "managerPlugin",
  },
  {
    label: "场景助手",
    value: "scenePlugin",
  },
];

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [currentPlugin, setCurrentPlugin] = useState(null);
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
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
  return (
    <div className="h-full flex flex-col">
      <Select
        placeholder="请选择要使用的插件"
        options={plugins}
        onChange={setCurrentPlugin}
        value={currentPlugin}
        allowClear
      />
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
      />
    </div>
  );
}
