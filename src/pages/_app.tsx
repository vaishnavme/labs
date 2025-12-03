import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { geistMono, geistSans, sourceSerif } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`antialiased isolate ${sourceSerif.variable} ${geistSans.variable} ${geistMono.variable} font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
}
