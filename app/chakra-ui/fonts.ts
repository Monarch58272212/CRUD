// app/fonts.ts
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const fonts = {
  rubik,
};
