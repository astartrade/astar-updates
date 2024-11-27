import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

import Slider from "@/components/ui/Slider";

type Props = {};

const MainSlider = (props: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 9000,
    }),
  ]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="embla">
      <div className="embla__container relative">
        <div className="embla__slide">
          <Slider image="farming.jpg" />
        </div>
        <div className="embla__slide">
          <Slider
            description="Lobbying for policies that recognize and facilitate the return of diasporas to their ancestral homes."
            link="/african-diaspora-126-plus"
          />
        </div>
        <div className="embla__slide">
          <Slider
            description="Helping individuals pursue opportunities abroad, whether for 
            work, education, or specialized training."
            heading="Unlock Opportunities Abroad"
            image="airport2.jpg"
            link="/aaha"
          />
        </div>
        <div className="embla__slide">
          <Slider
            description="Whether you are searching for a land, building a property, or purchasing a home, our comprehensive services are designed to support you every step of the way."
            heading="Build Your Dream Home"
            image="real-estate2.jpg"
            link="/real-estate"
          />
        </div>
      </div>
      <div className="absolute bottom-4 right-5 z-10 flex items-center gap-x-4 md:bottom-12 md:right-16 ">
        <button
          className="embla__prev aspect-square h-auto rounded-full bg-lime-600 p-2 hover:bg-lime-500 "
          onClick={scrollPrev}
        >
          <LucideArrowLeft className="text-white" />
        </button>
        <button
          className="embla__next  aspect-square h-auto rounded-full bg-lime-600 p-2 hover:bg-lime-500 "
          onClick={scrollNext}
        >
          <LucideArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
