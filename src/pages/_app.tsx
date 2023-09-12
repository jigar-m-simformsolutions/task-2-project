import Layout from "@/Components/Layout/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import Protected from "@/Components/Protected/Protected";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <Protected> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </Protected> */}
    </SessionProvider>
  );
}
