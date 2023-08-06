"use client";

import * as React from "react";

import { TooltipProvider } from "@/chatComponents/ui/tooltip";

export function Providers({ children, ...props }: any) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
