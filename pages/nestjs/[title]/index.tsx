import React from "react";
import fetchPageInfo from "../../../components/utils/fetchPageInfo";
import fetchSocials from "../../../components/utils/fetchSocials";
import fetchNextjs from "../../../components/utils/fetchNextjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { NestJS, PageInfo, Social } from "../../../components/lib/typings";
import Header from "../../../components/commons/layout/Header";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "../../../components/commons/items/RichTextComponents";
import "easymde/dist/easymde.min.css";
import fetchNestjsId from "../../../components/utils/nestjs/fetchNestjsID";
import fetchNestjs from "../../../components/utils/nestjs/fetchNestjs";

type Props = {
  pageInfo?: PageInfo;
  socials?: Social[];
  nestjs: NestJS[];
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const nestjs = await fetchNestjsId(params?.title);
  const pageInfo = await fetchPageInfo();
  const socials = await fetchSocials();
  return {
    props: {
      pageInfo,
      socials,
      nestjs,
    },
    revalidate: 1000,
  };
};

export default function NextIdPage({ pageInfo, socials, nestjs }: Props) {
  return (
    <>
      <Header Home contact pageInfo={pageInfo} socials={socials} />

      <main className="py-5 px-20 max-w-7xl">
        <div className=" w-full flex items-center  ">
          {nestjs.map((item) => (
            <div className="w-full" key={item._id}>
              <h1 className="flex-1 text-4xl font-bold py-3 pl-3 dark:bg-white/40 bg-black text-white dark:text-white/60 ">
                {item.title}
              </h1>
              <div className="flex flex-col mt-10 flex-1 ">
                <PortableText
                  value={item?.content}
                  components={RichTextComponents}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const nestjs = await fetchNestjs();

  const paths = nestjs.map((post) => ({
    params: { title: post.title },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
};
