"use client";
import React from "react";
import Image from "next/image";
import {
  LucideArrowUpRight,
  LucideGlobe,
  LucidePhoneIncoming,
  LucideVoicemail,
} from "lucide-react";

import ServiceCardWithBackgroundImage from "./ServiceCardWithBackgroundImage";
import AfricanDiasporaServices from "./AfricanDiasporaServices";

import { bebas, poppins } from "@/config/fonts";

type Props = {};

const DiasporaJumbotron = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function onScroll({ scroll, limit, velocity, direction, progress }: any) {
      //   console.log(scroll, limit, velocity, direction, progress);
    }
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        autoResize: true,
        scrollCallback: onScroll,
        lenisOptions: {
          //   wrapper: document.querySelector('#scroll-wrapper') as HTMLElement,
          //   content: document.querySelector('#scroll-content') as HTMLElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou,
        },
      });

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <section className="grid h-auto min-h-screen   gap-4 p-4">
      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
      >
        <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
          <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
            <h1 className="max-w-xl text-4xl capitalize leading-10 md:text-5xl  md:leading-[3rem] ">
              Supporting the African diaspora
            </h1>

            <p
              className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
            >
              African Diaspora 126+ is a non-profit organization working to help
              people of African descent to reconnect with their heritage. We
              advocate for the Right to Return, focusing on policies that
              facilitate the African Diaspora integration to the Motherland.
            </p>
          </div>
        </div>
        <div
          className="relative   col-span-1 flex aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="text-yellow-500">Our Mission</h1>
          <p className={`${poppins.className} text-sm`}>
            To champion the Right to Return by building collaborative networks
            with local partners, enabling descendants of the African Diaspora to
            reintegrate and thrive in their ancestral homeland.
          </p>
        </div>
        <ServiceCardWithBackgroundImage backgroundImage="mission4.jpg" />
      </div>

      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
      >
        <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
          <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
            <h1
              className="max-w-xl text-3xl capitalize leading-10 text-yellow-600 md:text-4xl 
             md:leading-[3rem] "
            >
              Message to the Diaspora Community
            </h1>

            <p
              className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
            >
              Congratulations to all African Diaspora Descendants (HUG) who have
              successfully embraced their heritage through the citizenship
              process. Each journey home is a milestone, not just for the
              individual, but for all of us. It’s a testament to the resilience
              of African culture and the power of connection. Akwaaba! Welcome
              home.
            </p>
          </div>
        </div>
        <ServiceCardWithBackgroundImage backgroundImage="vision4.jpg" />
        <div
          className="relative   col-span-1 flex aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="text-yellow-500">Our Vision</h1>
          <p className={`${poppins.className} text-sm`}>
            We envision a vibrant Africa enriched by the presence, talents, and
            contributions of its Diaspora descendants. Through shared heritage
            and collective support, we strive for an Africa where everyone with
            roots in this land can once again call it home.
          </p>
        </div>
      </div>
      <div className="container mx-auto grid aspect-square  grid-cols-1 rounded-2xl md:aspect-video   ">
        <div className=" relative flex flex-col justify-center rounded-3xl">
          <Image
            alt="Vision Background"
            className="absolute inset-0 z-10 rounded-2xl"
            fill={true}
            quality={100}
            src="/images/aaha.jpg"
            style={{ objectFit: "cover" }}
          />
          <div className=" container z-20 mx-auto flex flex-col items-center justify-center space-y-3 ">
            <div>
              {/* <div
                className='max-w-5xl md:text-3xl text-white  p-4 md:p-8'
                data-scroll
                data-scroll-speed={0.1}>
                Founded on the belief that Africa’s future lies in its ability
                to collaborate, trade, and invest within itself, ASTAR was
                created to promote sustainable regional growth. Our team brings
                decades of experience in commodities trading and investment
                management, with a special focus on the African continent.
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <AfricanDiasporaServices />
      <div className="container mx-auto grid grid-cols-1 gap-4 space-y-2 md:grid-cols-3 ">
        <ServiceCardWithBackgroundImage backgroundImage="contactus.jpg" />

        <div
          className="relative   col-span-2 flex flex-col justify-center space-y-3
        rounded-2xl bg-black p-4 leading-[1.12rem] text-white md:aspect-auto md:p-8"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className={`${bebas.className} uppercase text-yellow-500 `}>
            Contact us
          </h1>
          <p className={`${poppins.className} text-sm md:w-3/4 md:text-lg`}>
            Ready to learn more or start your journey home? Reach out to us and
            let us build a future of connection, community, and cultural pride.
          </p>
          <div className="h-[2px] w-[120px] border-0 border-t border-solid border-yellow-500 " />{" "}
          <div className="space-y-3">
            <div className="flex flex-col gap-x-4  text-yellow-500 md:flex-row md:items-center ">
              <span className="hidden md:inline-block">
                {" "}
                <LucideVoicemail />{" "}
              </span>{" "}
              Email: info@africadiaspora126.com
            </div>
            <div className="flex flex-col gap-x-4  text-yellow-500 md:flex-row md:items-center ">
              <span className="hidden md:inline-block">
                {" "}
                <LucidePhoneIncoming />{" "}
              </span>
              Phone: +233 269 173 378{" "}
            </div>
            <div className="flex flex-col gap-x-4  text-yellow-500 md:flex-row md:items-center ">
              <span className="hidden md:inline-block">
                {" "}
                <LucideGlobe />{" "}
              </span>
              Address: 173/4 Otswe Street, Osu, Accra, Ghana
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiasporaJumbotron;
