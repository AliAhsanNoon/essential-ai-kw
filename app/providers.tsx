"use client";

import { GlobalProvider } from "@/lib/ContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}

