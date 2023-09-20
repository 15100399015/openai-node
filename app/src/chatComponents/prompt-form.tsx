import { UseChatHelpers } from "ai/react";
import * as React from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/chatComponents/ui/button";
import { IconArrowElbow } from "@/chatComponents/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/chatComponents/ui/tooltip";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      style={{ marginTop: 0 }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full mb-[30px] grow flex-col overflow-hidden bg-background pr-8 border sm:pr-12">
        <Textarea
          disabled={isLoading}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={!isLoading ? onKeyDown : () => {}}
          rows={1}
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          placeholder="发送消息"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ""}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
