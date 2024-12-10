"use client";
import React from "react";
import Image from "next/image";
import { LucideArrowUpRight } from "lucide-react";

// Removed the import for ServiceCardWithBackgroundImage due to the error

import { bebas, poppins } from "@/config/fonts";
import ServiceCardWithBackgroundImage from "@/components/ui/ServiceCardWithBackgroundImage";


export default function Aaha()
{
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
      <div className="container mx-auto grid aspect-square  grid-cols-1 rounded-2xl md:aspect-video   ">
        <div className=" relative flex flex-col justify-center rounded-3xl">
          <Image
            alt="Vision Background"
            className="absolute inset-0 z-10 rounded-2xl"
            fill={true}
            quality={100}
            src="/images/airport2.jpg"
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

      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
      >
        <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
          <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
            <h1 className="max-w-xl text-4xl capitalize leading-10 md:text-5xl  md:leading-[3rem] ">
              Pursue Opportunities Abroad
            </h1>

            <p
              className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
            >
              AAHA is dedicated to helping individuals pursue opportunities
              abroad, whether for work, education, or specialized training. Our
              primary focus is on providing assistance to those aiming to travel
              to the UK, US, or Canada. We handle everything from visa
              applications to securing employment or school placements, ensuring
              a hassle-free journey.
            </p>
          </div>
        </div>
        <div
          className="relative   col-span-1 flex aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="text-lime-500">Repatriation Services</h1>
          <p className={`${poppins.className} text-sm`}>
            For those looking to return home, AAHA also offers repatriation
            services, aiding individuals in settling back into life in Africa
            with ease and confidence
          </p>
        </div>
        <ServiceCardWithBackgroundImage backgroundImage="aaha5.jpg" />
      </div>
    </section>
  );
};

