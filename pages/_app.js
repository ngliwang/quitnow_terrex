import FullLayout from "../src/layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";
import React from "react";
// app.get('/cors', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send({ "msg": "This has CORS enabled 🎈" })
//   })
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>QuitNow</title>
        <meta name="description" content="Generated by create next app" />
        <meta httpEquiv="Content-security-Policy" content="upgrade-insecure-requests"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </>
  );
}

export default MyApp;
