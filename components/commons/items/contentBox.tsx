import React, { useState } from "react";
import { urlFor } from "../../../sanity";
import { motion } from "framer-motion";
import { Image } from "../../lib/typings";
import { useRouter } from "next/router";

type Props = {
  title: string;
  image?: Image;
  createdAt: Date;
  onClick?: () => void;
};

const ContentBox = ({ title, image, createdAt, onClick }: Props) => {
  const [ShowTitle, setShowTitle] = useState(false);

  return (
    <div
      onClick={onClick}
      className="max-w-72 relative h-80 rounded-2xl flex flex-col overflow-hidden"
    >
      <div
        onMouseEnter={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
        className="w-full h-full overflow-hidden text-center "
      >
        <div>
          {ShowTitle && (
            <div
              onClick={onClick}
              className="absolute cursor-pointer flex items-center justify-center h-full w-full font-bold bg-gray-900/50 text-white sm:text-3xl lg:text-7xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300  "
            >
              <h1>{title}</h1>
            </div>
          )}
        </div>
        <div className="w-full h-full">
          {image ? (
            <motion.img
              src={urlFor(image)?.url()}
              className="w-full h-full  object-cover"
              alt={`${image} image`}
            ></motion.img>
          ) : (
            <div className="bg-white w-full h-full ">
              <motion.img
                src="/vercel.svg"
                alt="none"
                className="object-contain  w-full h-full "
              ></motion.img>
            </div>
          )}
        </div>
        <h1 className="absolute bottom-0 right-0 text-black">
          {new Date(createdAt).toLocaleDateString()}
        </h1>
      </div>
    </div>
  );
};

export default ContentBox;
