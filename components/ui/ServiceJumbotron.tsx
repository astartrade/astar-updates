"use client";
import React from "react";
import Image from "next/image";
import { LucideArrowUpRight } from "lucide-react";

import { bebas, poppins } from "@/config/fonts";

type Props = {};

const ServiceJumbotron = (props: Props) => {
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
    <section className="grid h-auto min-h-screen gap-4 p-4">
      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
      >
        <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
          <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
            <h1 className="max-w-xl text-4xl capitalize leading-10 md:text-5xl  md:leading-[3rem] ">
              Commodity Trading
            </h1>

            <p
              className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
            >
              ASTAR LLC specializes in the trade of essential commodities within
              Africa’s booming markets. From agriculture to minerals, we connect
              sellers and buyers, ensuring smooth transactions and reliable
              supply chains.
            </p>
          </div>
        </div>
        <div
          className="relative   col-span-1 flex aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="text-lime-500">Sectors of Operation</h1>
          <p className={`${poppins.className} text-sm`}>
            We focus on high-growth sectors, including energy, agriculture,
            infrastructure, and technology, offering investors unique
            opportunities for meaningful returns.
          </p>
        </div>
        <div
          className="relative   col-span-1 flex aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-lime-600 p-4 text-base leading-[1.12rem] text-black"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1>Our Approach</h1>
          <p className={`${poppins.className} text-sm text-white`}>
            We combine data-driven insights with on-the-ground knowledge to help
            investors navigate Africa’s emerging markets and make informed
            investment decisions.
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
            src="/images/services4.jpg"
            style={{ objectFit: "cover" }}
          />
          <div className=" container z-20 mx-auto flex flex-col items-center justify-center space-y-3 ">
            <div>
              {/* <div
                className='max-w-5xl md:text-3xl text-white  p-4 md:p-8'
                data-scroll
                data-scroll-speed={0.1}>
                Founded on the belief that Africa’s future lies in its ability
                to collaborate, trade, and invest within itself, ASTAR LLC was
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
        <div
          className="relative   col-span-2 flex aspect-auto flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-xl leading-tight text-white md:p-8"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="leadig-[2.9rem] text-5xl text-lime-600 ">
            End-To-End Facilitation
          </h1>
          <p className={`${poppins.className} text-base  `}>
            We offer end-to-end trade facilitation services, including market
            access support, regulatory guidance, and logistics management. With
            our support, businesses can overcome international trade barriers,
            stay compliant with complex regulations, and leverage the best
            logistics solutions to maximize operational efficiency. Trust us to
            be your partner in achieving seamless, successful trade operations
            from start to finish.
          </p>
        </div>

        <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
          <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
            <div className=" max-w-md text-left text-3xl capitalize leading-[1.8rem] md:text-4xl  md:leading-8 ">
              Intra-African Trade <br /> Facilitation
            </div>

            <p
              className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
            >
              African markets are full of untapped potential, but navigating
              regional trade regulations, logistics, and supply chains can be
              complex. ASTAR LLC simplifies this process, helping businesses and
              investors unlock the power of Africa's intra-regional trade.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid aspect-square  grid-cols-1 rounded-2xl md:aspect-video   ">
        <div className=" relative flex flex-col justify-center rounded-3xl">
          <Image
            alt="Vision Background"
            className="absolute inset-0 z-10 rounded-2xl"
            fill={true}
            quality={100}
            src="/images/services3.jpg"
            style={{ objectFit: "cover" }}
          />
          <div className=" container z-20 mx-auto flex flex-col items-center justify-center space-y-3 ">
            <div>
              {/* <div
                className='max-w-5xl md:text-3xl text-white  p-4 md:p-8'
                data-scroll
                data-scroll-speed={0.1}>
                Founded on the belief that Africa’s future lies in its ability
                to collaborate, trade, and invest within itself, ASTAR LLC was
                created to promote sustainable regional growth. Our team brings
                decades of experience in commodities trading and investment
                management, with a special focus on the African continent.
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceJumbotron;
