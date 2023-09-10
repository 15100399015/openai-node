import { nanoid } from "@/lib/utils";
import { Chat } from "@/chatComponents/chat";
import { TailwindIndicator } from "@/chatComponents/tailwind-indicator";
import { Providers } from "@/chatComponents/providers";
import { EventSocketPanel } from "@/chatComponents/event-socket-panel";
export const runtime = "edge";

export default function IndexPage() {
  const id = nanoid();

  return (
    <Providers attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col h-screen overflow-hidden">
        <Chat id={id} />
      </div>
      <EventSocketPanel></EventSocketPanel>
      <TailwindIndicator />
    </Providers>
  );
}
