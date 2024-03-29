import React from "react";
import fetchPageInfo from "../../../components/utils/fetchPageInfo";
import fetchSocials from "../../../components/utils/fetchSocials";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { NestJS, PageInfo, Social } from "../../../components/lib/typings";
import Header from "../../../components/commons/layout/Header";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "../../../components/commons/items/RichTextComponents";
import "easymde/dist/easymde.min.css";
import fetchNestjsId from "../../../components/utils/nestjs/fetchNestjsID";
import fetchNestjs from "../../../components/utils/nestjs/fetchNestjs";
import { useRouter } from "next/router";
import { SocialIcon } from "react-social-icons";

type Props = {
  pageInfo?: PageInfo;
  socials?: Social[];
  nestjs: NestJS[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const nestjs = await fetchNestjsId(params?._id);
  const pageInfo = await fetchPageInfo();
  const socials = await fetchSocials();
  return {
    props: {
      pageInfo,
      socials,
      nestjs,
    },
  };
};

export default function NestIdPage({ pageInfo, socials, nestjs }: Props) {
  const router = useRouter();
  return (
    <>
      <Header Home contact pageInfo={pageInfo} socials={socials} />

      <main className="py-5 px-20 max-w-7xl">
        <div className=" w-full flex items-center ">
          {nestjs.map((item) => (
            <div className="w-full h-screen relative" key={item._id}>
              <div className="flex-1  py-2 font-bold  pl-3 dark:bg-white/40 bg-black text-white/10 dark:text-white/60 items-center flex gap-3 ">
                <p
                  className="cursor-pointer"
                  onClick={() => router.push("/nestjs")}
                >
                  nestjs /
                </p>
                <p>{item.title}</p>
              </div>
              <div className="flex flex-col sm:mt-0 md:mt-10 flex-1 ">
                <PortableText
                  value={item?.content}
                  components={RichTextComponents}
                />
              </div>
              {item?.link ? (
                <div className=" flex items-center gap-1 absolute bottom-0 right-0">
                  <h1>
                    <span className="border-b border-red-400 pb-2">
                      Authorship :
                    </span>{" "}
                    Click to Icon
                  </h1>
                  <SocialIcon
                    fgColor="gray"
                    bgColor="transparent"
                    url={item?.link}
                    target={"_blank"}
                    className="hover:fill-gray-300"
                  />
                </div>
              ) : undefined}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
