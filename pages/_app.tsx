import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType } from "next";
import Script from "next/script";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/utils/Layout";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Spinner from "../components/commons/items/Spinner";
import { useLoading } from "../components/lib/hooks/useLoading";
import { motion } from "framer-motion";
import NaverModal from "../components/commons/modal/NaverModal";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <div className="z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#242424] text-white scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#6667ab] relative">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8322923444929146"
        crossOrigin="anonymous"
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function() {
            var w = window;
            if (w.ChannelIO) {
              return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
            }
            var ch = function() {
              ch.c(arguments);
            };
            ch.q = [];
            ch.c = function(args) {
              ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
              if (w.ChannelIOInitialized) {
                return;
              }
              w.ChannelIOInitialized = true;
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
              s.charset = 'UTF-8';
              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            }
            if (document.readyState === 'complete') {
              l();
            } else if (window.attachEvent) {
              window.attachEvent('onload', l);
            } else {
              window.addEventListener('DOMContentLoaded', l, false);
              window.addEventListener('load', l, false);
            }
          })();
          ChannelIO('boot', {
            "pluginKey": '9f1d89b0-e2f4-40fa-b806-8f1a9bd37d91'
          });
          `,
        }}
      />
      <Head>
        <meta
          name="google-site-verification"
          content="i1u4yIbhC41SOpFzuW4UTjueqO6j69ZxyTTNMZs-x-g"
        />
      </Head>
      <SessionProvider>
        <>
          <Layout>
            {useLoading() ? (
              <motion.div
                className="absolute top-1/2 right-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Spinner
                  className="absolute top-1/2  right-1/2 z-50"
                  color="red"
                  size={50}
                />
              </motion.div>
            ) : null}
            <NaverModal />
            <Component {...pageProps} />
          </Layout>
        </>
      </SessionProvider>
      {process.env.NODE_ENV !== "development" && <Analytics />}
    </div>
  );
};

export default MyApp;
