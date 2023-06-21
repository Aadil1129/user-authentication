import React from "react";
import "../styles/globals.css";
import "@fontsource/montserrat";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>User Authentication</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Still Nothing " />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
