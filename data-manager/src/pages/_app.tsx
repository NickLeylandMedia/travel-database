import type { AppProps } from "next/app";

import "../styles/globals.scss";

import { RecoilRoot } from "recoil";

import { QueryClientProvider, QueryClient } from "react-query";

import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        {/* <Script
          id="analytics-1"
          strategy="lazyOnload"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        ></Script>
        <Script id="analytics-2" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);`}
        </Script> */}
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
export default MyApp;
