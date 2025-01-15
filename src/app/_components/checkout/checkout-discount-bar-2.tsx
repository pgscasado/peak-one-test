import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import SaveSeal from "@/../public/images/save-seal.png";
import { ClockIcon } from '@heroicons/react/24/solid'; 

type DiscountProps = {
  product: number;
  info: CheckoutPageType;
  couponActive: boolean;
  country: string;
};

//shows the current discount off of full pricer
const DiscountBar = ({
  product,
  info,
  couponActive,
  country,
}: DiscountProps) => {
    const [mins, setMins] = useState(10);
    const [secs, setSecs] = useState(0);
    const [message, setMessage] = useState("");
    const [isExpired, setIsExpired] = useState(false);
  
    useEffect(() => {
      let timer: NodeJS.Timeout;
  
      if (isExpired) {
        if (!message) {
          // Wait 2 seconds at 00:00 before showing the expiration message
          timer = setTimeout(() => {
            setMessage("Offer Expired... Requesting Extension!");
          }, 1000);
        } else if (message === "Offer Expired... Requesting Extension!") {
          // Show extension message after 3 seconds
          timer = setTimeout(() => {
            setMessage("Extension Granted - You've Got 5 Extra Minutes");
          }, 3000);
        } else {
          // Clear message and reset timer after 3 more seconds
          timer = setTimeout(() => {
            setMessage("");
            setMins(5);
            setSecs(0);
            setIsExpired(false);
          }, 3000);
        }
      } else {
        timer = setInterval(() => {
          if (secs > 0) {
            setSecs(secs - 1);
          } else if (mins > 0) {
            setMins(mins - 1);
            setSecs(59);
          } else {
            setIsExpired(true);
          }
        }, 1000);
      }
  
      return () => clearTimeout(timer);
    }, [mins, secs, isExpired, message]);
  
    const formatTime = (time: number) => {
      return time.toString().padStart(2, "0");
    };
  const discountDetails = [
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/3fea0d9a-2395-48e0-bd69-6a3ed0e4a100/public",
      alt: "50% Discount Badge",
      text: "Your 50% Discount Has Been Applied",
      percent: "50%",
      oldPrice: info.product.ogPrice1,
      newPrice: info.product.price1,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/f3b86681-3446-4bd8-db4a-1e99050a5300/public",
      alt: "56% Discount Badge",
      text: "Your 56% Discount Has Been Applied",
      percent: "56%",
      oldPrice: info.product.ogPrice2,
      newPrice: info.product.price2,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/9d753d3d-eb6d-439c-4168-fc13fb261600/public",
      alt: "58% Discount Badge",
      text: "Your 58% Discount Has Been Applied",
      percent: "58%",
      oldPrice: info.product.ogPrice3,
      newPrice: info.product.price3,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/54294b32-6664-4698-9756-5b0091956c00/public",
      alt: "60% Discount Badge",
      text: "Your 60% Discount Has Been Applied",
      percent: "60%",
      oldPrice: info.product.ogPrice4,
      newPrice: info.product.price4,
    },
  ];

  const currentDiscount = discountDetails[product];
  const currentPrice =
    Number(currentDiscount.newPrice) - (couponActive ? 5 : 0);

  return (
    <div className="flex w-full items-center justify-center bg-[#fff1af] p-0">
      <div className='relative text-center flex-initial'>
        <Image
          src={SaveSeal}
          width={70}
          height={70}
          alt={currentDiscount.alt}
          className="object-scale-down float-right"
        />
        <p className="absolute text-[0.6rem] sm:text-[1rem] w-full font-bold text-white float-right right-0 top-1/2 translate-y-[-50%] leading-[0.7rem] sm:leading-[0.9rem]">
          {currentDiscount.percent}<br/>
          OFF
        </p>
      </div>
      <div className="flex flex-col w-auto pl-4">
        <p className="text-[17px] sm:text-[16px] font-bold">
          <span className='text-red-500'>HURRY!</span> LIMITED TO 100 SPOTS ONLY!
        </p>
        <p className="text-[14px] font-bold">
          Your spot is reserved for <ClockIcon className="text-red-500 inline w-4 h-4"/> {formatTime(mins)}:{formatTime(secs)}
        </p>
      </div>
    </div>
  );
};

export default DiscountBar;
