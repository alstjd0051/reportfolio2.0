import '../styles/globals.css';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRef, useState } from 'react';
import { defaultComponents } from '@portabletext/react';
import { NextComponentType } from 'next';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <SessionProvider>
      <div className="z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#242424] text-white scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#6667ab] ">
        <QueryClientProvider client={queryClientRef.current}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
