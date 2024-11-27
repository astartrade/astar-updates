import { LucideMoveDown } from "lucide-react";
import Image from "next/image";
import React from "react";

import BackgroundImageWrapper from "./BackgroundImageWrapper";

import { bebas, playfair_display } from "@/config/fonts";

type Props = {
  title?: string;
  order?: number;
  children?: React.ReactNode;
};

const Start = ({ title, order = 1, children }: Props) => {
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
    <section
      className={`${bebas.className} grid h-dvh min-h-screen grid-cols-1 md:grid-cols-3`}
    >
      <div className={` order- relative min-h-dvh p-4 md:p-6${order}`}>
        <BackgroundImageWrapper backgroundImage="/images/farmer3.jpg" />

        <div className=" relative z-10 flex h-full flex-col items-start justify-between">
          <p className="pt-2 text-xl leading-5 text-lime-900">
            Our vast network, market expertise, and commitment to reliable
            supply make us a trusted partner in commodity trading
          </p>
          <div data-scroll className="space-y-4" data-scroll-speed={0.1}>
            {/* <LucideMove3d className="text-lime-500 text-[2.9em]" /> */}
            <div className="text-[3em] text-white">
              <p className="leading-[0.9em] ">
                Access Our Strategic <br />
                Investment <br /> Opportunities{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`order- relative col-span-1 hidden h-full min-h-dvh flex-col items-start justify-between bg-white p-4 md:col-span-2 md:flex md:p-6${3 - order}`}
      >
        <div
          className={`${bebas.className} flex w-full items-center justify-between font-bebas`}
        >
          <div
            className={`text-[1.7em] text-white ${playfair_display.className}`}
          >
            {title}
          </div>
        </div>

        <div className="container relative flex max-w-4xl items-center justify-center">
          <Image
            alt="alt"
            className="animation-duration-100 absolute animate-pulse"
            height={400}
            src={"/images/world.png"}
            style={{ width: "auto", height: "auto" }}
            width={400}
          />
          <div
            data-scroll
            className="text-center text-[3vw] leading-[0.9em] text-lime-600"
            data-scroll-speed={0.3}
          >
            {children}
          </div>
        </div>

        <div className="hidden md:block">
          <LucideMoveDown className="size-6 animate-bounce text-white" />
        </div>
      </div>
    </section>
  );
};

export default Start;
