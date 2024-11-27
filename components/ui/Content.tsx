"use client";
import Link from "next/link";
import React, { useRef } from "react";

import { siteConfig } from "../../config/site";

import Marquee from "./marquee";

import { bebas } from "@/config/fonts";

export default function Content() {
  return (
    <div className="flex size-full flex-col  justify-between bg-lime-600 px-12 py-8">
      <Nav />
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);

  return (
    <div className="relative flex items-end justify-between text-neutral-100 ">
      <div className="absolute -left-14 bottom-5 mt-10 text-[3rem]  leading-[0.8]  ">
        <div className="hidden w-full text-lime-200 opacity-35 md:block  ">
          <Marquee className=" " speed={70}>
            <p ref={firstText}>
              {" "}
              AStar Trading & Agro Processing Co. Ltd. &#x2014;{" "}
            </p>
            <p ref={secondText}>
              {" "}
              AStar Trading & Agro Processing Co. Ltd. &#x2014;{" "}
            </p>
          </Marquee>
        </div>
      </div>
      <div className="w-full items-center justify-between pt-10 md:flex">
        <div>
          <Link href={"/"}>
            {siteConfig.year} &copy; copyright &#x2014; All Rights Reserved.
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <Link href={"/"}>LinkedIn</Link>
          <Link href={"/"}>Facebook</Link>
          <Link href={"/"}>Instagram</Link>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div
      className={`${bebas.className} z-50 flex shrink-0 flex-col items-start gap-8 text-neutral-300 md:flex-row
         md:gap-12 md:pt-[20dvh]`}
    >
      <div className="flex flex-col">
        <h3 className="mb-2 text-2xl uppercase text-white">About</h3>
        <Link href={"/about"}>About Us</Link>
        <Link href={"/news"}>News</Link>
        <Link href={"/contact"}>Contact Us</Link>
      </div>
      <div className="flex flex-col">
        <h3 className="mb-2 text-2xl uppercase text-white">Disclaimers</h3>
        <Link href={"/privacy"}>Privacy Policy</Link>
        <Link href={"/cookies"}>Cookie Policy</Link>
        <Link href={"/terms"}>Terms & Conditions</Link>
      </div>
      <div className="flex flex-col">
        <h3 className="mb-2 text-2xl uppercase text-white">Services</h3>
        <Link href={"/services"}>Agriculture</Link>
        <Link href={"/services"}>Minerals & Natural Resources</Link>
        <Link href={"/services"}>Technology</Link>
      </div>
      <div className="flex flex-col">
        <h3 className="mb-2 text-2xl uppercase text-white">Partners</h3>
        <Link href={"/real-estate"}>Real Estate</Link>
        <Link href={"/african-diaspora-126-plus"}>African Diaspora 126+</Link>
        <Link href={"/aaha"}>Access Africa Home & Abroad (AAHA)</Link>
      </div>
    </div>
  );
};
