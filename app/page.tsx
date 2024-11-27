'use client';

import Start from '@/components/Start';
import Jumbotron from '@/components/ui/Jumbotron';
import CallToAction from '@/components/ui/CallToAction';
import ServiceIntroduction from '@/components/ui/ServiceIntroduction';
import Quote from '@/components/ui/Quotes';
import MainSlider from '@/components/ui/MainSlider';

export default function Home() {
  return (
    <main className='  h-full'>
      {/* <Slider /> */}
      <MainSlider />
      <Start>
        <span>
          Unlocking Africa's Potential through
          <br />
          Strategic Commodity Trade and Investment.
        </span>
      </Start>
      <Jumbotron />
      <Quote />
      <ServiceIntroduction />

      <CallToAction />
    </main>
  );
}
