/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
});
