/** @format */

import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "./../styles/global-style";
import wrapper from "@lib/store/configureStore";
import 'tailwindcss/tailwind.css';
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
      <Global styles={globalStyles} />

        <Component {...pageProps} />
  
    </>
  );
}

export default wrapper.withRedux(MyApp);
