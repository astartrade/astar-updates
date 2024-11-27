import React from "react";
import Image from "next/image";

import { bebas } from "@/config/fonts";

interface Props {
  text?: string;
  name?: string;
  title?: string;
}

const Quote: React.FC<Props> = ({
  text = `With deep market knowledge, a dependable supply chain, and a vast network, we’re the trusted choice in commodity trading. Our commitment to reliability and expertise makes us a valuable partner, helping you navigate complex markets with ease.`,
  name = " ASTAR LLC",
  title = "Market Dynamics",
}) => {
  return (
    <div
      data-scroll
      className="relative mb-8 bg-neutral-200  "
      data-scroll-speed={0.1}
    >
      <Image
        alt="Laboratory professional at work"
        className="absolute inset-0 size-full object-cover"
        fill={true}
        src="/images/homepage.png"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-32 ">
        <blockquote className="mx-auto flex  h-auto max-w-5xl flex-col items-start justify-center">
          <p className="mb-6  md:text-lg">
            <span className=" text-lime-600">{name},</span>{" "}
            <span className="text-neutral-500">{title}</span>
          </p>

          <h1 className={`${bebas.className} text-white md:text-4xl `}>
            {text}
            {/* <TextGenerateEffect words={text} /> */}
          </h1>
        </blockquote>
      </div>
    </div>
  );
};

export default Quote;
