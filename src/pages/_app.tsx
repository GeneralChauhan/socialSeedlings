import "@/styles/globals.css";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { PhotoProvider } from '../contexts/PhotoContext';
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
 
  
  return (
    <>
    <PhotoProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </PhotoProvider>
    </>
  );
}
