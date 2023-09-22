import { type UseChatHelpers } from "ai/react";

import { Button } from "@/chatComponents/ui/button";
import { PromptForm } from "@/chatComponents/prompt-form";
import { IconRefresh, IconStop } from "@/chatComponents/ui/icons";
import { Select } from "antd";

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

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  plugin: string | null;
  setPlugin: (plugin: string) => void;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  setPlugin,
  plugin,
}: ChatPanelProps) {
  return (
    <div>
      <div className="relative mx-auto sm:max-w-2xl sm:px-4">
        <div className="absolute inset-x-0 flex h-10 -top-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              停止生成
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                重新生成
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 bg-background shadow-lg">
          <Select
            style={{ width: "100%" }}
            placeholder="请选择要使用的插件"
            options={plugins}
            onChange={setPlugin}
            value={plugin}
            placement="topLeft"
            allowClear
          />
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
