"use client";
import React, { useEffect, useState } from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import Image from "next/image";
import { siteProduct } from "@/lib/site-info";

type Props = {
  info: CheckoutPageType;
};

const CheckoutHeader = ({ info }: Props) => {
  return (
    <>
      <div className="w-full">
        <div className="flex w-full relative">
          <Image
            src={info.header.background}
            alt="background"
            fill
            className="absolute top-0 z-0 object-cover brightness-50"
            priority
          />
          <div className="flex w-full justify-center z-10 py-4">
            <div className="flex w-full max-w-[1100px] px-4 flex-col lg:flex-row">
              <div className="flex w-full justify-between items-center space-x-2 lg:space-x-0 ">
                <Image
                  src={info.header.logo}
                  alt={siteProduct}
                  width={100}
                  height={60}
                  className="w-1/2 sm:w-auto lg:mr-[60px] max-w-1/2 object-scale-down"
                  priority
                />
                <Image
                  src={info.header.badge}
                  alt={siteProduct}
                  width={70}
                  height={70}
                  className="w-1/2 sm:w-auto max-w-[130px] object-scale-down"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutHeader;
