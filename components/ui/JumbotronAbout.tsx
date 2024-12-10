'use client';
import React from 'react';
import Image from 'next/image';
import { LucideArrowUpRight } from 'lucide-react';

import { bebas, poppins } from '@/config/fonts';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

type Props = {};

const JumbotronAbout = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function onScroll({ scroll, limit, velocity, direction, progress }: any) {
      //   console.log(scroll, limit, velocity, direction, progress);
    }
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll({
        autoResize: true,
        scrollCallback: onScroll,
        lenisOptions: {
          //   wrapper: document.querySelector('#scroll-wrapper') as HTMLElement,
          //   content: document.querySelector('#scroll-content') as HTMLElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou,
        },
      });

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <section className='grid h-auto min-h-screen   gap-4 p-4'>
      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}>
        <div className='col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8'>
          <div className='h-full flex-col items-start justify-end space-y-3 md:flex '>
            <h1 className='max-w-xl text-4xl capitalize leading-10 md:text-5xl  md:leading-[3rem] '>
              About Astar
            </h1>

            <p
              className={`${poppins.className} text-left  text-lg capitalize text-gray-500`}>
              ASTAR was founded on the belief that Africa's future lies in its
              ability to collaborate, trade, and invest within the continent,
              promoting sustainable regional growth. Our team brings decades of
              experience in commodities trading and investment management, with
              a special focus on the African continent.
            </p>
          </div>
        </div>
        <div
          className='relative   col-span-1 flex  flex-col justify-end space-y-2
          md:aspect-auto aspect-square 
        rounded-2xl bg-black p-4 text-base leading-[1.12rem] text-white'>
          <LucideArrowUpRight className='absolute right-3 top-3 text-white ' />
          <h1 className='text-lime-500 text-medium '>Our Vision</h1>
          <p className={`${poppins.className} text-medium md:text-sm `}>
            Our Vision is a united Africa where regional trade flows seamlessly,
            fostering mutual growth and long-term prosperity.
          </p>
        </div>
        <div
          className='relative   col-span-1 flex md:aspect-auto aspect-square flex-col justify-end space-y-2
        rounded-2xl bg-lime-600 p-4 text-base leading-[1.12rem] text-black'>
          <LucideArrowUpRight className='absolute right-3 top-3 text-white ' />
          <h1 className=' text-medium'>Our Mission</h1>
          <p
            className={`${poppins.className} text-medium md:text-sm  text-white`}>
            To drive Africa’s economic growth by enabling seamless commodity
            trading and fostering impactful investment opportunities across
            regional markets
          </p>
        </div>
      </div>
      <div className='container mx-auto grid aspect-auto  grid-cols-1 rounded-2xl md:aspect-video   '>
        <div className=' relative flex flex-col justify-center rounded-3xl'>
          {/* <div className='absolute inset-0 z-20 bg-black/35 rounded-2xl' ></div> */}
          <Image
            alt='Vision Background'
            className='absolute inset-0 z-10 rounded-2xl'
            fill={true}
            quality={100}
            src='/images/mission.jpg'
            style={{ objectFit: 'cover' }}
          />
          <div className=' container z-30  mx-auto flex flex-col items-center justify-center space-y-3 '>
            {/* <div>
              <div
                className='max-w-6xl text-xl md:text-4xl text-neutral-100 md:uppercase leading-[1.5rem]  md:font-bold md:px-2 p-5 md:p-8'
                data-scroll
                data-scroll-speed={0.1}>
                ASTAR was founded on the belief that Africa's future lies in its ability to collaborate, trade, and invest within the continent, promoting sustainable regional growth. Our team brings
                decades of experience in commodities trading and investment
                management, with a special focus on the African continent.
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 gap-4 md:grid-cols-5`}>
        <div className='col-span-1 rounded-2xl bg-white p-4 md:col-span-3 md:p-8'>
          <div className='h-full flex-col justify-center space-y-2 md:flex '>
            <h1 className='max-w-xl text-4xl capitalize leading-10 md:text-5xl  md:leading-[3rem] '>
              A Quest For sustainable <br /> regional growth
            </h1>

            <p
              className={`${poppins.className} text-left  text-lg capitalize text-gray-500`}>
              Our team brings decades of experience in commodities trading and
              investment management, with a special focus on the African
              continent.
            </p>
          </div>
        </div>
        <div
          className='relative   col-span-1 flex md:aspect-auto aspect-square flex-col justify-end rounded-2xl
        bg-black p-4 text-xl leading-[1.3rem] text-white'>
          <LucideArrowUpRight className='absolute right-3 top-3 text-white ' />
          <span className=''>
            African trade <br /> expertise
          </span>
        </div>
        <div
          className='relative   col-span-1 flex  md:aspect-auto aspect-square flex-col justify-end rounded-2xl
        bg-lime-600 p-4 text-xl leading-[1.3rem] text-white'>
          <LucideArrowUpRight className='absolute right-3 top-3 text-white' />
          <span className=''>
            Fostering collaborative <br />
            partnerships.
          </span>
        </div>
      </div>

      {/* <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4`}>
        <div className='col-span-1 md:col-span-3 bg-white p-4 md:p-8 rounded-2xl  flex flex-col justify-center'>
          <div className='space-y-2 '>
            <h1 className='capitalize text-4xl md:text-5xl leading-[2.5rem] max-w-xl  md:leading-[3rem] '>
              Our Vision
            </h1>

            <p className={`${poppins.className} capitalize  text-gray-500 text-left text-lg`}>
              Our Vision is a united Africa where regional trade flows seamlessly, fostering mutual growth and long-term prosperity.
            </p>
          </div>
        </div>
        <div
          className='col-span-1    relative bg-lime-600 rounded-2xl text-xl leading-[1.3rem]
        flex flex-col justify-end text-white p-4'>
          <LucideArrowUpRight className='text-white absolute right-3 top-3' />
          Empowering regional <br /> markets
        </div>
        <div
          className='col-span-1    relative bg-black rounded-2xl text-xl leading-[1.3rem]
        flex flex-col justify-end text-white p-4'>
          <LucideArrowUpRight className='text-white absolute right-3 top-3 ' />
          African trade <br /> expertise
        </div>
      </div> */}

      {/* <div
        className={`${bebas.className} container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4`}>
        <div
          className='col-span-1    relative bg-lime-600 rounded-2xl text-xl leading-[1.3rem]
        flex flex-col justify-end text-white p-4'>
          <LucideArrowUpRight className='text-white absolute right-3 top-3' />
          Empowering regional <br /> markets
        </div>
        <div
          className='col-span-1    relative bg-black rounded-2xl text-xl leading-[1.3rem]
        flex flex-col justify-end text-white p-4'>
          <LucideArrowUpRight className='text-white absolute right-3 top-3 ' />
          African trade <br /> expertise
        </div>
        <div className='col-span-1 md:col-span-3 bg-white p-4 md:p-8 rounded-2xl  flex flex-col justify-center'>
          <div className='space-y-2 '>
            <h1 className='capitalize text-4xl md:text-5xl leading-[2.5rem] max-w-xl  md:leading-[3rem] '>
              Our Mission
            </h1>

            <p className={`${poppins.className} capitalize  text-gray-500 text-left text-lg`}>
              To drive Africa’s economic growth by enabling seamless commodity
              trading and fostering impactful investment opportunities across
              regional markets
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className='container mx-auto grid grid-cols-1 bg-white rounded-2xl  md:aspect-video   '>
        <div className=' rounded-3xl flex flex-col justify-center relative'>
          <Image
            src='/images/vision.jpg'
            alt='Vision Background'
            fill={true}
             style={{objectFit: "cover"}} 
            className='absolute inset-0 z-10 rounded-2xl'
            quality={100}
          />
          <div className=' z-20 container mx-auto flex flex-col justify-center items-center space-y-3 '>
            <div
              className='max-w-5xl md:text-3xl text-white  p-4 md:p-8'
              data-scroll
              data-scroll-speed={0.1}>
              Our Vision is a united Africa where regional trade flows
              seamlessly, fostering mutual growth and long-term prosperity
            </div>

          </div>
        </div>
      </div> */}

      <>
        {/* Approach */}
        <div className='bg-white pt-5'>
          {/* Approach */}
          <div className='mx-auto max-w-5xl rounded-3xl px-4 py-10 lg:py-20 xl:px-0'>
            {/* Title */}
            <div className='mb-10 max-w-3xl lg:mb-14'>
              <h2
                className={`${bebas.className}  text-2xl font-semibold md:text-4xl md:leading-tight`}>
                Partnerships
              </h2>
              <p className='mt-1 text-neutral-600'>
                ASTAR works closely with businesses, governments, and private
                investors to create mutually beneficial partnerships that foster
                regional trade and growth. If you’re interested in working
                together, learn more about how we can collaborate
              </p>
            </div>

            <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16'>
              <div className='aspect-w-16 aspect-h-9 lg:aspect-none'>
                <Image
                  priority
                  alt='Features Image'
                  className='w-full rounded-xl object-cover'
                  height={600}
                  src='/images/vision3.jpg'
                  width={480}
                />
              </div>

              <div className='text-black'>
                <div className='mb-4'>
                  <h2
                    className={`${bebas.className} text-2xl font-semibold md:text-4xl md:leading-tight`}>
                    Our Core Values
                  </h2>
                </div>

                <div className='ms-1 flex gap-x-5'>
                  <div className='relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden'>
                    <div className='relative z-10 flex size-8 items-center justify-center'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-xs font-semibold uppercase text-lime-700'>
                        1
                      </span>
                    </div>
                  </div>
                  <div className='grow pb-8 pt-0.5 sm:pb-12'>
                    <p className='text-medium md:text-sm  text-neutral-600 lg:text-base'>
                      <span
                        className={`${bebas.className} pr-3 text-xl text-black`}>
                        Integrity:
                      </span>{' '}
                      <br />
                      We believe in transparency and ethical practices in every
                      transaction.
                    </p>
                  </div>
                </div>

                <div className='ms-1 flex gap-x-5'>
                  <div className='relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden'>
                    <div className='relative z-10 flex size-8 items-center justify-center'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-xs font-semibold uppercase text-lime-700'>
                        2
                      </span>
                    </div>
                  </div>
                  <div className='grow pb-8 pt-0.5 sm:pb-12'>
                    <p className='text-medium md:text-sm  text-neutral-600 lg:text-base'>
                      <span
                        className={`${bebas.className} pr-3 text-xl text-black`}>
                        Sustainability:
                      </span>{' '}
                      <br />
                      We prioritize sustainable investments that benefit
                      communities and the environment.
                    </p>
                  </div>
                </div>

                <div className='ms-1 flex gap-x-5'>
                  <div className='relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden'>
                    <div className='relative z-10 flex size-8 items-center justify-center'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-xs font-semibold uppercase text-lime-700'>
                        3
                      </span>
                    </div>
                  </div>
                  <div className='grow pb-8 pt-0.5 sm:pb-12'>
                    <p className='text-medium md:text-sm  text-neutral-600 md:text-base'>
                      <span
                        className={`${bebas.className} pr-3 text-xl text-black`}>
                        Collaboration:
                      </span>{' '}
                      <br />
                      We are stronger together and believe in the power of
                      partnerships to drive progress.
                    </p>
                  </div>
                </div>

                <div className='ms-1 flex gap-x-5'>
                  <div className='relative after:absolute after:bottom-0 after:start-4 after:top-8 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800 last:after:hidden'>
                    <div className='relative z-10 flex size-8 items-center justify-center'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-xs font-semibold uppercase text-lime-700'>
                        4
                      </span>
                    </div>
                  </div>
                  <div className='grow pb-8 pt-0.5 sm:pb-12'>
                    <p className='text-medium md:text-sm  text-neutral-600 md:text-base'>
                      <span
                        className={`${bebas.className} pr-3 text-xl text-black`}>
                        Innovation
                      </span>{' '}
                      <br />
                      We embrace forward-thinking solutions to stay ahead in the
                      ever-evolving market.
                    </p>
                  </div>
                </div>
                <Button
                  variant='flat'
                  className='group inline-flex items-center gap-x-2 rounded-full bg-lime-500 px-4 py-2 text-medium md:text-sm  font-medium text-white focus:outline-none'
                  href='/contact'>
                  <svg
                    className='size-4 shrink-0'
                    fill='none'
                    height='24'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                    <path
                      className='opacity-0 transition group-hover:opacity-100 group-hover:delay-100 group-focus:opacity-100'
                      d='M14.05 2a9 9 0 0 1 8 7.94'
                    />
                    <path
                      className='opacity-0 transition group-hover:opacity-100 group-focus:opacity-100'
                      d='M14.05 6A5 5 0 0 1 18 10'
                    />
                  </svg>
                  Schedule a call
                </Button>
              </div>
              {/* End Timeline */}
            </div>
            {/* End Grid */}
          </div>
        </div>
        {/* End Approach */}
      </>
    </section>
  );
};

export default JumbotronAbout;
