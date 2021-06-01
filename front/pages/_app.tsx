/** @format */

import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "./../styles/global-style";
import wrapper from "@lib/store/configureStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
