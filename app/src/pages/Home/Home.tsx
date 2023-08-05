import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";

import '@/globals.css'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
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
