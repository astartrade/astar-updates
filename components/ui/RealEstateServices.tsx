"use client";
import { LucideArrowUpRight } from "lucide-react";
import React from "react";

import ServiceIntroComponent from "./ServiceIntroComponent";
import ServiceCardWithBackgroundImage from "./ServiceCardWithBackgroundImage";

import { bebas, poppins } from "@/config/fonts";

type Props = {
  title?: string;
  order?: number;
  children?: React.ReactNode;
};

const RealEstateServices = ({ title, order = 1, children }: Props) => {
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
    <div className="pb-4">
      <section className="grid h-auto min-h-screen   gap-4 p-4">
        <div
          className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
        >
          <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
            <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
              <h1 className="max-w-xl text-3xl capitalize leading-10 text-lime-600 md:text-3xl  md:leading-[3rem] ">
                Empower, Invest and Belong
              </h1>

              <p
                className={`${poppins.className} text-left  text-base capitalize text-gray-500`}
              >
                We are committed to creating lasting opportunities for
                individuals and families, particularly within the diaspora to
                invest in real estate and establish roots in their home country.
                Whether you are searching for a land, building a property, or
                purchasing a home, our comprehensive# are designed to support
                you every step of the way.
              </p>
            </div>
          </div>
          <div
            className="relative   col-span-1 flex flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
          >
            <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
            <h1 className="text-lime-500">Our Goal</h1>
            <p className={`${poppins.className} text-sm`}>
              Our goal is to make real estate investment easy and accessible for
              all, especially for those abroad who may find it challenging to
              navigate the local market.
            </p>
          </div>
          <ServiceCardWithBackgroundImage backgroundImage="real-estate-goal.jpg" />
        </div>
        <div
          className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}
        >
          <div className="col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8">
            <div className="h-full flex-col items-start justify-end space-y-3 md:flex ">
              <h1 className="max-w-xl text-3xl capitalize leading-10 text-lime-600 md:text-3xl  md:leading-[3rem] ">
                Comprehensive Service
              </h1>

              <p
                className={`${poppins.className}  text-left  text-base capitalize text-gray-500`}
              >
                From identifying the ideal land to handing you the keys to your
                completed property, we manage every aspect of the process with
                care and precision. Our goal is to provide a hassle-free
                experience, ensuring every detail is handled so you can focus on
                your vision and the bigger picture.
              </p>
            </div>
          </div>
          <ServiceCardWithBackgroundImage backgroundImage="trust.jpg" />
          <div
            className="relative   col-span-1 flex  flex-col justify-end space-y-2
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white"
          >
            <LucideArrowUpRight className="absolute right-3 top-3 text-white " />
            <h1 className="text-lime-500">Trust and Professionalism</h1>
            <p className={`${poppins.className} text-sm`}>
              We are dedicated to delivering high-quality, trustworthy service.
              We prioritize your piece of mind ensuring that your real estate
              investment is safe, secure, and hassle-free.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`${bebas.className} flex h-auto min-h-screen flex-col justify-center `}
      >
        <div className={`  relative space-y-6 p-4 md:p-6 `}>
          <div className=" justify-RealEstateServices items-RealEstateServices relative z-10 flex h-auto flex-col space-y-3 md:px-2">
            <h1 className="text-[2em] text-lime-500 ">
              Diaspora Focused Solutions
            </h1>

            <p className={`${poppins.className} max-w-4xl  text-lg `}>
              We specialize in helping members of the diaspora reconnect with
              their roots by facilitating land acquisition, construction, and
              home buying with ease and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ServiceIntroComponent
              description="For those in the diaspora eager to reconnect with their
              roots through land investment, we oversee the entire process. From meticulously
              searching for suitable plots to coordinating with reputable surveyors, we ensure due
              diligence is upheld, providing you with authentic and verified land that aligns with your
              vision."
              image="/images/land.svg"
              title="Land Search and Acquisition"
            />
            <ServiceIntroComponent
              description={`Once we identify the perfect parcel of land, our
                        experienced team collaborates with professional surveyors to validate and secure your
                        investment, giving you peace of mind as you move forward.`}
              image="/images/wallet.svg"
              title="Surveying and Land Purchase"
              url="#"
            />
            <ServiceIntroComponent
              description={`Whether you aspire to build a cozy family home or a thriving
                commercial space, we work with a network of trusted contractors and skilled architects.
                Together, we bring your vision to life, ensuring that your property is crafted to your
                exact specifications and desires.`}
              image="/images/worker.svg"
              title="Construction Services"
              url="#"
            />
            <ServiceIntroComponent
              description={`Whether you aspire to build a cozy family home or a thriving
                commercial space, we work with a network of trusted contractors and skilled architects.
                Together, we bring your vision to life, ensuring that your property is crafted to your
                exact specifications and desires.`}
              image="/images/worker2.svg"
              title="Architectural and Contracting Support"
              url="#"
            />
            <ServiceIntroComponent
              description={`Whether you aspire to build a cozy family home or a thriving
                commercial space, we work with a network of trusted contractors and skilled architects.
                Together, we bring your vision to life, ensuring that your property is crafted to your
                exact specifications and desires.`}
              image="/images/building.svg"
              title="Construction Services"
              url="#"
            />
            <ServiceIntroComponent
              description={`If you prefer to purchase a home rather than build, we are
                here to guide you through the local market with confidence. We offer a curated selection
                of homes tailored to your preferences, lifestyle, and budget, making the home-buying
                process smooth and enjoyable.`}
              image="/images/home.svg"
              title="Home Buying Assistance"
              url="#"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container hidden text-2xl">
          Whether you are looking to invest in land, build a home, or purchase
          property in your homeland, ASTAR LLC is here to support you through
          the entire process. Together, we can turn your dreams into reality,
          creating a lasting legacy for you and your family.
        </div>
      </section>
    </div>
  );
};

export default RealEstateServices;
