'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import PardyLogo from '@/images/pardy.png';

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = [
    'amazing',
    'memorable',
    'unforgettable',
    'incredible',
    'epic',
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="flex gap-10 py-20 lg:py-40 items-center justify-center flex-col">
          <Image src={PardyLogo} alt="Pardy Logo" width={300} height={300} />
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular text-foreground">
              <span className="text-primary">makes events</span>
              <span className="relative inline-block h-[1.2em] w-full text-center md:pb-4 md:pt-1">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex items-center justify-center font-semibold text-foreground"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -30 : 30,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-default-600 max-w-3xl text-center">
              Transform your event planning from chaos to celebration. Create
              events, track RSVPs effortlessly, and manage your guest list with
              precision.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-full text-black bg-white border-white hover:bg-gray-100"
                variant="bordered"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                className="rounded-full text-black bg-white hover:bg-gray-100"
                variant="solid"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
