"use client";
import React from "react";
import Image from "next/image";
import { LucideArrowUpRight } from "lucide-react";
import { Button, Link } from "@nextui-org/react";

import { bebas, poppins } from "@/config/fonts";

type Props = {};

const PartnerJumbotron = (props: Props) => {
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
    <section className="grid h-auto min-h-screen grid-cols-1  gap-4 p-4">
      <div className="container mx-auto grid h-auto grid-cols-1 gap-4 rounded-2xl md:grid-cols-3   min-h-[350px] ">
        <div
          className={`${bebas.className} relative    col-span-2 flex aspect-auto flex-col  justify-end space-y-3 rounded-2xl
        bg-lime-700 p-4 text-base  leading-[1.12rem] text-white md:p-8`}
          id="real_estate_services"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="leadig-[2.9rem] text-5xl text-lime-300 ">
            African Diaspora 126+
          </h1>
          <p
            className={`${poppins.className} text-left  text-base capitalize text-white`}
          >
            A non-profit organization focused on supporting the African
            diaspora. We advocate for the Right of Return, ensuring that people
            of African descent have the opportunity to reconnect with their
            heritage. Our work includes lobbying for policies that recognize and
            facilitate the return of diasporas to their ancestral homes.
            <br />
          </p>
          <Button
            as={Link}
            className="text-white md:w-1/4 "
            href="/african-diaspora-126-plus"
            variant="flat"
          >
            Read More ...
          </Button>
        </div>
        <div className="relative  aspect-square md:aspect-auto col-span-1 flex flex-col justify-center rounded-3xl md:col-span-1   ">
          <Image
            alt="Vision Background"
            className="absolute inset-0 z-10 rounded-2xl object-cover"
            src="/images/aaha.jpg"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

        </div>
      </div>
      <div className="container mx-auto grid h-auto grid-cols-1 gap-4 rounded-2xl md:grid-cols-3   min-h-[350px] ">
        <div className="relative aspect-square md:aspect-auto col-span-1 flex flex-col justify-center rounded-3xl md:col-span-1">
          <Image
            alt="Vision Background"
            className="absolute inset-0 z-10 rounded-2xl object-cover"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/real-estate2.jpg"
          />
        </div>
        <div
          className={`${bebas.className} relative    col-span-2 flex aspect-auto flex-col  justify-center space-y-3 rounded-2xl
        bg-black p-4 text-base  leading-[1.12rem] text-white md:p-8`}
          id="real_estate_services"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="leadig-[2.9rem] text-5xl text-lime-600 ">
            Real Estate Services
          </h1>
          <p
            className={`${poppins.className} text-left  text-base capitalize text-white`}
          >
            We specialize in real estate services that cater to diasporas
            looking to invest in their homeland. Our offerings cover everything
            from land acquisition to home purchasing. We provide land searches,
            arrange professional surveyors, facilitate land purchases, and
            connect clients with reputable architects and contractors to build
            their dream homes.
            <br />
          </p>
          <Button
            as={Link}
            className="text-white md:w-1/4 "
            href="/real-estate"
            variant="flat"
          >
            Read More ...
          </Button>
        </div>
      </div>

      <div className="container mx-auto grid h-auto grid-cols-1 gap-4 rounded-2xl md:grid-cols-3  min-h-[350px] ">
        <div
          className={`${bebas.className} relative    col-span-2 flex aspect-auto flex-col  justify-center space-y-3 rounded-2xl
        bg-blue-700 p-4 text-base  leading-[1.12rem] text-white md:p-8`}
          id="real_estate_services"
        >
          <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
          <h1 className="leadig-[2.9rem] text-5xl text-blue-400 ">
            Access Africa Home & Abroad (AAHA):
          </h1>
          <p
            className={`${poppins.className} text-left  text-base capitalize text-white`}
          >
            AAHA is committed to supporting individuals in pursuing global
            opportunities, whether for employment, education, or specialized
            training. We primarily focus on assisting those interested in
            journeys to the UK, US, or Canada, providing guidance tailored to
            each destination.
            <br />
          </p>
          <Button
            as={Link}
            className="text-white md:w-1/4"
            href="/aaha"
            variant="flat"
          >
            Read More ...
          </Button>
        </div>
        <div className="relative  aspect-square md:aspect-auto col-span-1 flex flex-col justify-center rounded-3xl md:col-span-1">
          <Image
            className="absolute inset-0 z-10 rounded-2xl object-cover"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            alt="Vision Background"
            src="/images/airport2.jpg"
          />
        </div>

      </div>
    </section>
  );
};

export default PartnerJumbotron;
