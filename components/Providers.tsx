// app/providers.tsx
"use client";

import ModalProvider from "@/contexts/ModalContext";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <ModalProvider>{children}</ModalProvider>
          </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
