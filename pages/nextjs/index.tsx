import React, { Suspense, useEffect, useState } from "react";
import { NextJS, PageInfo, Skill, Social } from "../../components/lib/typings";
import Header from "../../components/commons/layout/Header";
import fetchPageInfo from "../../components/utils/fetchPageInfo";
import { GetServerSideProps, GetStaticProps } from "next";
import fetchSocials from "../../components/utils/fetchSocials";
import Footer from "../../components/commons/layout/Footer";
import fetchNextjs from "../../components/utils/fetchNextjs";
import ContentBox from "../../components/commons/items/contentBox";
import fetchSkills from "../../components/utils/fetchSkills";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import BoardList from "../../components/commons/items/BoardList";
import Spinner from "../../components/commons/items/Spinner";
import useSWR from "swr";
import axios from "axios";

type Props = {
  pageInfo?: PageInfo;
  socials?: Social[];
  nextjs: NextJS[];
  skills: Skill[];
};

const NextJSPage = ({ pageInfo, socials, skills }: Props) => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/next/getNextjs`
  );

  const nextjs: NextJS[] = data?.nextjs;

  const [changedBoard, setChangedBoard] = useState(false);
  const onClickState = () => {
    setChangedBoard(!changedBoard);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner className="" color="red" size={25} />
      </div>
    );
  }
  return (
    <div>
      <Header
        skill={skills}
        Home
        socials={socials}
        pageInfo={pageInfo}
        contact
      />
      <main>
        <div className="flex flex-col px-20   ">
          <hr className="w-full py-5 " />
          <div className="justify-end flex gap-3 items-center">
            {changedBoard ? (
              <>
                <PhotoIcon className="cursor-pointer w-8 h-8 stroke-2 " />
                <ListBulletIcon
                  onClick={onClickState}
                  className="cursor-pointer w-5 my-5 h-5"
                />
              </>
            ) : (
              <>
                <PhotoIcon
                  onClick={onClickState}
                  className="cursor-pointer w-5 h-5"
                />
                <ListBulletIcon className="cursor-pointer my-5 stroke-2 w-8 h-8" />
              </>
            )}
          </div>
          <div
            className={`${
              changedBoard
                ? "grid lg:grid-cols-4 sm:grid-cols-2 items-center justify-items-center gap-10"
                : "flex items-center flex-col"
            }`}
          >
            {changedBoard
              ? nextjs?.map((item) => (
                  <ContentBox
                    title={item.title}
                    image={item.sumbnail}
                    createdAt={item?.createdAt || item._createdAt}
                    key={item._id}
                    route={`/nextjs/${item._id}`}
                  />
                ))
              : nextjs?.map((item) => (
                  <>
                    <BoardList
                      key={item._id}
                      createdAt={item?.createdAt || item._createdAt}
                      title={item.title}
                      route={`nextjs/${item._id}`}
                    />
                  </>
                ))}
          </div>
        </div>
        <div className="h-52"></div>
      </main>
    </div>
  );
};

export default NextJSPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const pageInfo = await fetchPageInfo();
  const socials = await fetchSocials();
  const nextjs = await fetchNextjs();
  const skills = await fetchSkills();
  return {
    props: {
      pageInfo,
      socials,
      nextjs,
      skills,
    },
  };
};
