// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <KindeProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </KindeProvider>
  );
}
