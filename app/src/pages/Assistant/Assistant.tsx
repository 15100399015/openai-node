import { nanoid } from "@/lib/utils";
import { Chat } from "@/chatComponents/chat";

import '@/globals.css'
import { TailwindIndicator } from '@/chatComponents/tailwind-indicator'
import { Providers } from '@/chatComponents/providers'
import { Header } from '@/chatComponents/header'
export const runtime = "edge";

export default function IndexPage() {
  const id = nanoid();

  return (
    <Providers attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col flex-1 bg-muted/50">
          <Chat id={id} />
        </main>
      </div>
      <TailwindIndicator />
    </Providers>
  );
}
