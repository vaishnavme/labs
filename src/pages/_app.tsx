import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { geistMono, geistSans, sourceSerif } from "@/styles/fonts";
import Footer from "@/components/layout/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${sourceSerif.variable} ${geistSans.variable} ${geistMono.variable} isolate font-sans text-justify`}
    >
      <div className="mx-auto max-w-xl w-full space-y-16 px-4 md:px-8 pt-12 min-h-screen flex flex-col justify-between">
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
