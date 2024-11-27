import { LucideBuilding, LucideTheater } from "lucide-react";
import React from "react";

import ServiceCard from "./ServiceCard";
import ServiceCardWithBackgroundImage from "./ServiceCardWithBackgroundImage";

import { bebas } from "@/config/fonts";

type Props = {};

const Jumbotron = (props: Props) => {
  return (
    <section
      className={`${bebas.className} container mx-auto  h-auto rounded-2xl  py-8 `}
    >
      <div className="flex h-auto flex-col justify-between ">
        <div>
          <>
            {/* Hero */}
            <div className="relative overflow-hidden before:absolute before:start-1/2 before:top-0 before:-z-[1] before:size-full before:-translate-x-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-cover before:bg-top before:bg-no-repeat dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
              <div className="mx-auto max-w-[85rem] px-4 pb-10 pt-8 sm:px-6 lg:px-8">
                {/* Announcement Banner */}
                <div className="flex justify-center" />
                {/* End Announcement Banner */}

                {/* Title */}
                <div className="mx-auto mt-5 max-w-5xl text-center">
                  <h1
                    data-scroll
                    className={`${bebas.className} block  text-3xl text-gray-800 dark:text-neutral-100 md:text-5xl lg:text-5xl`}
                    data-scroll-speed={0.0}
                  >
                    At ASTAR, we believe in Africa’s vast potential and are
                    committed to unlocking opportunities through strategic
                    commodity trading and investment.
                  </h1>
                </div>
                {/* End Title */}

                {/* End Buttons */}
              </div>
            </div>
            {/* End Hero */}
          </>
        </div>

        <div className="grid h-auto grid-cols-1 gap-4 p-4 py-12 align-baseline md:grid-cols-6">
          <ServiceCard text="Intra-African Trade Facilitation" />
          <ServiceCardWithBackgroundImage backgroundImage="farmer.jpg" />
          <ServiceCard
            icon={<LucideTheater />}
            text="Investment Opportunities"
          />
          <ServiceCardWithBackgroundImage />
          <ServiceCard icon={<LucideBuilding />} text="Commodity Trading " />
          <ServiceCardWithBackgroundImage backgroundImage="vision3.jpg" />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
