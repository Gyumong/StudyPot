/** @format */

import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "./../styles/global-style";
import { ConnectedRouter } from "connected-next-router";
import wrapper from "@lib/store/configureStore";
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </>
  );
}

export default wrapper.withRedux(MyApp);
