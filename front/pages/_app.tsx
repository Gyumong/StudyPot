/** @format */

import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "./../styles/global-style";
import wrapper from "@lib/store/configureStore";
import "tailwindcss/tailwind.css";

import { ThemeProvider } from "@emotion/react";
import theme from "@styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <ConnectedRouter>
          <Component {...pageProps} />
        </ConnectedRouter>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
