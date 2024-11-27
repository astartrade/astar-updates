import React from "react";

import ServiceIntroComponent from "./ServiceIntroComponent";

import { bebas, poppins } from "@/config/fonts";

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
    <section className={`${bebas.className} grid h-auto grid-cols-1 `}>
      <div className={`  relative space-y-6 p-4 md:p-6 `}>
        <div className=" relative z-10 flex h-auto flex-col items-start justify-start space-y-3 md:px-2">
          <h1 className="text-[3em] leading-[0.9em] text-lime-500 ">
            Our Services &#x2014;
          </h1>

          <p className={`${poppins.className} max-w-4xl  text-lg `}>
            ASTAR connects buyers, sellers, and investors across Africa in
            agriculture, minerals, and energy. We simplify trade, foster
            sustainable growth, and offer end-to-end support for reliable,
            impactful partnerships in emerging markets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ServiceIntroComponent
            description="We trade high-quality agricultural products, fostering sustainable farming practices and supporting local economies. Products such as Soya Beans, Shea Butter, Cashew, Palm Oil, Maize, Rice etc"
            title="Agriculture"
          />
          <ServiceIntroComponent
            description={`Facilitating the trade of Africa's abundant natural resources and minerals such as, Mining (Gold, Diamond, Tanzanite) Crude Oil etc`}
            image="/images/mining.svg"
            title="Minerals & Natural Resources"
            url="/services"
          />
          <ServiceIntroComponent
            description={`Involved in the regional trade of key energy products, contributing to Africa's energy security. Green Energy or Solar Wind, Hydro Power etc.`}
            image="/images/energy.svg"
            title="Energy"
            url="/services"
          />
        </div>
      </div>
    </section>
  );
};

export default Start;
