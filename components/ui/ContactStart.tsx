'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { LucideBadgeCheck } from 'lucide-react';

import { GoogleMap } from './GoogleMap';

import { bebas } from '@/config/fonts';

interface InputsData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactStart = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InputsData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const checkForToken = useCallback(async () => {
    if (!token && executeRecaptcha) {
      try {
        const recaptchaToken = await executeRecaptcha('inquirySubmit');

        if (recaptchaToken) {
          // console.log("Token received from Google::::::::", recaptchaToken);
          setToken(recaptchaToken); // Set the token in state
          // verify token with handleCaptchaSubmission
          handleCaptchaSubmission(recaptchaToken);
        }
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error);
      }
    } else {
      // console.log("Token already present or executeRecaptcha not available");
    }
  }, [token, executeRecaptcha]);

  // checkForToken();

  // // Call the checkForToken function when the component mounts or when executeRecaptcha changes
  useEffect(() => {
    // console.log("EXECUTING USEEFECT...")
    checkForToken();
  }, [checkForToken]);

  //   // verify token and then submit form
  //   // const response = await handleCaptchaSubmission(recaptchaToken)
  // }, [checkForToken]);

  async function notifyAllParties(
    firstName: string,
    email: string,
    gdueMemberId: string
  ) {
    try {
      const response = await fetch('/api/notification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email, gdueMemberId }),
      });

      if (response.ok) {
        return;
      } else {
        console.error('Notification not sent successfully');
      }
    } catch (error) {
      console.error('An error occurred while sending the notification:', error);
    }
  }

  async function handleCaptchaSubmission(token: string | null) {
    const response = axios
      .post('/api/recaptchaVerification/', { token })
      .then(function (response) {
        if (response.status !== 200) {
          toast.error('Verification failed ...');

          return;
        }

        setIsVerified(true);
      })
      .catch(function (error) {
        setIsVerified(false);
        console.error('Verification failed:', error);
      });
  }

  const onSubmit: SubmitHandler<InputsData> = async (
    data: InputsData | undefined
  ) => {
    // Create a promise for the axios request
    const myPromise = axios.post('/api/register/registrationForm/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Use toast.promise to handle the toast notifications
    toast.promise(
      myPromise,
      {
        loading: 'Submitting your request...',
        success: (response) => {
          // Handle success response
          const firstName = response.data.firstName;
          const email = response.data.email;
          const gdueMemberId = response.data.membershipNumber;

          console.log('NOTIFYING ....', firstName, email, gdueMemberId);

          const notify = notifyAllParties(firstName, email, gdueMemberId);

          // Log the membershipNumber
          // console.log('Membership Number:', membershipNumber);
          // reset();
          // window.location.reload();
          return 'Membership Request Submitted!';
        },
        error: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              // Handle specific status codes
              if (err.response.status === 409) {
                return 'User is already registered';
              }

              return 'Submission Error. Contact GDUE Office.';
            } else {
              return 'Submission Error. Contact GDUE Office.';
            }
          } else {
            return 'An unexpected error occurred. Please try again later.';
          }
        },
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 18000,
          icon: <LucideBadgeCheck color='limegreen' />,
        },
      }
    );

    try {
      // Await the promise to ensure that errors are caught
      await myPromise;
      // wait a while and reload the page
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      // window.location.reload();
    } catch (error) {
      // Additional error handling (if needed)
      console.error('Submission failed:', error);
    }
  };

  return (
    <section className='z-20 h-auto min-h-dvh pb-5 text-xl'>
      <div className='grid grid-cols-1 p-4 md:grid-cols-3'>
        <div
          className='col-span-1  flex h-auto flex-col  items-center
        justify-start bg-neutral-200 p-4 py-8 md:justify-center md:rounded-2xl md:p-6'>
          <div className={`${bebas.className} p5-5 m-5 text-3xl `}>
            Let us Connect and Build Africa’s Future Together.
          </div>

          <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('name')} required placeholder='Name' />
            <Input
              {...register('email')}
              required
              placeholder='Email'
              type='email'
            />
            <Input {...register('company')} placeholder='Company' />
            <textarea
              {...register('message')}
              className='min-h-16 w-full rounded-xl border p-2'
              placeholder='Send us a Message'
            />
            <Button
              className='mt-4 w-full  p-2 text-white'
              color='success'
              radius='full'
              type='submit'>
              Submit
            </Button>
          </form>
        </div>

        <div className='h-auto min-h-full p-4 text-base md:col-span-2 md:p-16 '>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4'>
            <div>
              <div className={`${bebas.className} block text-3xl`}>
                Our Office Location
              </div>
              <p className=' block'>
                178 Otswe Street, <br /> Osu, Accra - Ghana
              </p>
            </div>

            <div>
              <div className={`${bebas.className} block text-3xl`}>
                Contact Details
              </div>
              <p className=' block'>
                Email: info@astar-trade.com <br /> Phone: (+233) 26 917 3378
              </p>
            </div>
          </div>

          <div className='block pt-12'>
            <GoogleMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactStart;
