import "@/styles/globals.css";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
 
  
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
