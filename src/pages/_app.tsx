import "../styles/globals.css";
import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
