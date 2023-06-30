import React, { Suspense, useEffect, useState } from "react";
import { NextJS, PageInfo, Social } from "../../components/lib/typings";
import Header from "../../components/commons/layout/Header";
import fetchPageInfo from "../../components/utils/fetchPageInfo";
import { GetStaticProps } from "next";
import fetchSocials from "../../components/utils/fetchSocials";
import Footer from "../../components/commons/layout/Footer";
import fetchNextjs from "../../components/utils/fetchNextjs";
import ContentBox from "../../components/commons/items/contentBox";
import { useRouter } from "next/router";

type Props = {
  pageInfo?: PageInfo;
  socials?: Social[];
  nextjs: NextJS[];
};

const NextJSPage = ({ pageInfo, socials, nextjs }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Header Home socials={socials} pageInfo={pageInfo} contact />
      <main className="flex flex-col px-20   ">
        <hr className="w-full py-5 " />
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 items-center justify-items-center gap-10">
          {nextjs?.map((item) => (
            <ContentBox
              title={item.title}
              image={item.sumbnail}
              createdAt={item._createdAt}
              key={item._id}
              onClick={() => router.push(`nextjs/${item.title}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NextJSPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo = await fetchPageInfo();
  const socials = await fetchSocials();
  const nextjs = await fetchNextjs();
  return {
    props: {
      pageInfo,
      socials,
      nextjs,
    },
    revalidate: 1000,
  };
};
