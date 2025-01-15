import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/app/_context/SessionContext";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import { ProductInfoType } from "@/interfaces/productInfo";
import { Squares2X2Icon, StarIcon } from '@heroicons/react/24/solid';
import { delay } from "@/app/_utils/delay";
import SaveSeal from "@/../public/images/save-seal.png";
import { PriceDisplaySimple } from "./checkout-price-display";
import HighDemandSection from './high-demand-section';

type QuantityProps = {
  product: ProductInfoType;
  info: CheckoutPageType;
  setProduct: (product: ProductInfoType) => void;
  couponActive: boolean;
  country: string;
};

// Select the number of products to purchase
const QuantitySelector = ({
  product,
  info,
  setProduct,
  couponActive,
  country,
}: QuantityProps) => {
  const handleProductClick = (
    productNum: number,
    productPrice: number,
    productShipping: number,
    productShippingId: number,
    productOfferId: number,
    productStickyId: number
  ) => {
    setProduct({
      product: productNum,
      productName: `${productNum + 1}x ${info.product.name}`,
      productPrice: productPrice.toString(),
      productShipping: productShipping.toString(),
      productShippingId: productShippingId.toString(),
      productOfferId: productOfferId.toString(),
      productStickyId: productStickyId.toString(),
    });
  };

  const [price1, setPrice1] = useState(Number(info.product.price1));
  const [price2, setPrice2] = useState(Number(info.product.price2));
  const [price3, setPrice3] = useState(Number(info.product.price3));
  const [price4, setPrice4] = useState(Number(info.product.price4));

  const [showCouponFlag, setShowCouponFlag] = useState(false);

  useEffect(() => {
    function scrollIfNotVisible(elementId: string) {
      const element = document.getElementById(elementId);

      if (!element) return; // Exit if the element is not found

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is completely within the viewport
      const isCompletelyVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      // If not fully visible, scroll into view
      if (!isCompletelyVisible) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center", // Adjust this if you want it to align differently
        });
      }
    }

    const changePriceDrama = async () => {
      scrollIfNotVisible("quantity-selector");
      document.getElementById("price1")!.style.background = "#5acd65";
      await delay(200);
      setPrice1(price1 - parseFloat(info.product.couponValue));
      document.getElementById("price1")!.style.background = "none";
      document.getElementById("price2")!.style.background = "#5acd65";
      await delay(200);
      setPrice2(price2 - parseFloat(info.product.couponValue));
      document.getElementById("price2")!.style.background = "none";
      document.getElementById("price3")!.style.background = "#5acd65";
      await delay(200);
      setPrice3(price3 - parseFloat(info.product.couponValue));
      document.getElementById("price3")!.style.background = "none";
      document.getElementById("price4")!.style.background = "#5acd65";
      await delay(200);
      setPrice4(price4 - parseFloat(info.product.couponValue));
      document.getElementById("price4")!.style.background = "none";
      setShowCouponFlag(true);
    };
    if (couponActive) {
      changePriceDrama();
    }
  }, [couponActive]);

  return (
    <>
      <div
        className="flex w-full justify-between items-center pb-6"
        id="quantity-selector"
      >
        <div className="flex flex-row w-full align-middle">
          <Squares2X2Icon className="h-[32px] w-[32px] mr-2 my-auto" />
          <div className="">
            <p className='font-bold text-[16px]'>Select Quantity</p>
            <p>How many products would you like to buy?</p>            
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-8"> 
        <HighDemandSection />
        <div
          className={`relative h-36 py-4 flex flex-row w-full border-[1px] border-[#333] rounded-md cursor-pointer  hover:shadow-sm  hover:shadow-blue-500 transition-all ${
            product.product === 0 ? "border-blue-500 bg-amber-100" : "bg-white"
          }`}
          onClick={() => {
            handleProductClick(
              0,
              Number(info.product.price1),
              Number(info.product.ship1),
              Number(info.product.shippingId1),
              Number(info.product.offerId1),
              Number(info.product.stickyId1)
            );
          }}
        >
          <div className='flex flex-col w-1/2'>
            <div className="-mt-2 mb-2 ml-3 font-bold text-[14px] align-bottom">
              <input type='checkbox' checked={product.product === 0} className='mr-2 align-middle' />
              Buy 1x
            </div>
            <div className="flex w-fit h-full justify-center sm:justify-start items-center ml-6 relative">
              <Image
                src={info.product.image2}
                width={120}
                height={120}
                alt="Quantity 1"
              />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center text-right mr-10 w-full my-auto">
              <p className="text-[12px] relative w-fit ml-auto strikethrough-diagonal">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice1)}
                  countryCode={country}
                  digits={0}
                />
              </p>
              <p className="text-[20px] font-bold" id="price1">
                {/* ${price1.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price1}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[14px] text-[#5acd65] font-bold">
                You Save <PriceDisplaySimple priceUSD={Math.abs(price1 - parseFloat(info.product.ogPrice1))} countryCode={country} digits={2} />
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center relative">
          <div className="absolute top-[-20px] left-5 w-fit px-1 py-[3px] h-[30px] bg-blue-800 text-white rounded-md text-center font-bold text-[12px] flex flex-row justify-center [transform:translateZ(-50px)]">
              <StarIcon className="h-[16px] w-[16px] mr-1 text-yellow-300" /> BESTSELLER
            </div>
          <div
            className={`flex h-36 py-4 flex-row w-full border-[1px] border-[#333] rounded-md cursor-pointer  hover:shadow-sm  hover:shadow-blue-500 transition-all relative ${
              product.product === 1 ? "border-blue-500 bg-amber-100" : "bg-white"
            }`}
            onClick={() => {
              handleProductClick(
                1,
                Number(info.product.price2),
                Number(info.product.ship2),
                Number(info.product.shippingId2),
                Number(info.product.offerId2),
                Number(info.product.stickyId2)
              );
            }}
          >
            <div className='flex flex-col w-1/2'>
              <div className="-mt-2 mb-2 ml-3 font-bold text-[14px] align-bottom">
                <input type='checkbox' checked={product.product === 1} className='mr-2 align-middle' />
                Buy 2x
              </div>
              <div className="flex w-fit h-full justify-center sm:justify-start items-center ml-6 relative">
                <div className='absolute top-0 text-center w-32'>
                  <Image
                    src={SaveSeal}
                    width={60}
                    height={60}
                    alt='56% off'
                    className="object-scale-down w-1/3 max-w-32 float-right"
                  />
                  <p className="absolute text-[0.7rem] w-1/3 font-bold text-white float-right right-0 top-1/2 translate-y-[-50%] leading-[0.7rem]">
                    56%<br/>
                    OFF
                  </p>
                </div>
                <Image
                  src={info.product.image2}
                  width={120}
                  height={120}
                  alt="Quantity 1"
                />
              </div>
            </div>
            <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
              <div className="flex flex-col justify-center text-right mr-10 w-full my-auto">
                <p className="text-[12px] relative w-fit ml-auto strikethrough-diagonal">
                  {/* {info.product.ogPrice1} */}
                  <PriceDisplaySimple
                    priceUSD={parseFloat(info.product.ogPrice2)}
                    countryCode={country}
                    digits={0}
                  />
                </p>
                <p className="text-[20px] font-bold" id="price1">
                  {/* ${price1.toFixed(2)} */}
                  <PriceDisplaySimple
                    priceUSD={price2}
                    countryCode={country}
                    digits={2}
                  />
                </p>
                <p className="text-[14px] text-[#5acd65] font-bold">
                  You Save <PriceDisplaySimple priceUSD={Math.abs(price2 - parseFloat(info.product.ogPrice2))} countryCode={country} digits={2} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-8 mt-8">
        <div
          className={`relative h-36 py-4 flex w-full border-[1px] border-[#333] rounded-md cursor-pointer hover:shadow-sm  hover:shadow-blue-500 transition-all ${
            product.product === 2 ? "border-blue-500 bg-amber-100" : "bg-white"
          }`}
          onClick={() =>
            handleProductClick(
              2,
              Number(info.product.price3),
              Number(info.product.ship3),
              Number(info.product.shippingId3),
              Number(info.product.offerId3),
              Number(info.product.stickyId3)
            )
          }
        >
          <div className='flex flex-col w-1/2'>
            <div className="-mt-2 mb-2 ml-3 font-bold text-[14px] align-bottom">
              <input type='checkbox' checked={product.product === 2} className='mr-2 align-middle' />
              Buy 3x
            </div>
            <div className="flex w-fit h-full justify-center sm:justify-start items-center ml-6 relative">
              <div className='absolute top-0 text-center w-32'>
                <Image
                  src={SaveSeal}
                  width={60}
                  height={60}
                  alt='58% off'
                  className="object-scale-down w-1/3 max-w-32 float-right"
                />
                <p className="absolute text-[0.7rem] w-1/3 font-bold text-white float-right right-0 top-1/2 translate-y-[-50%] leading-[0.7rem]">
                  58%<br/>
                  OFF
                </p>
              </div>
              <Image
                src={info.product.image3}
                width={120}
                height={120}
                alt="Quantity 1"
              />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
          <div className="flex flex-col justify-center text-right mr-10 w-full my-auto">
              <p className="text-[12px] relative w-fit ml-auto strikethrough-diagonal">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice3)}
                  countryCode={country}
                  digits={0}
                />
              </p>
              <p className="text-[20px] font-bold" id="price1">
                {/* ${price1.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price3}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[14px] text-[#5acd65] font-bold">
                You Save <PriceDisplaySimple priceUSD={Math.abs(price3 - parseFloat(info.product.ogPrice3))} countryCode={country} digits={2} />
              </p>
            </div>
          </div>
        </div>
        <div
          className={`flex h-36 py-4 relative w-full border-[1px] border-[#333] rounded-md cursor-pointer  hover:shadow-sm  hover:shadow-blue-500 transition-all duration-200 ${
            product.product === 3 ? "border-blue-500 bg-amber-100" : "bg-white"
          }`}
          onClick={() =>
            handleProductClick(
              3,
              Number(info.product.price4),
              Number(info.product.ship4),
              Number(info.product.shippingId4),
              Number(info.product.offerId4),
              Number(info.product.stickyId4)
            )
          }
        >
        <div className='flex flex-col w-1/2'>
            <div className="-mt-2 ml-3 font-bold text-[14px] align-bottom">
              <input type='checkbox' checked={product.product === 3} className='mr-2 align-middle' />
              Buy 4x
            </div>
            <div className="flex w-fit h-full justify-center sm:justify-start items-center ml-6 relative">
              <div className='absolute top-0 text-center w-32'>
                <Image
                  src={SaveSeal}
                  width={60}
                  height={60}
                  alt='60% off'
                  className="object-scale-down w-1/3 max-w-32 float-right"
                />
                <p className="absolute text-[0.7rem] w-1/3 font-bold text-white float-right right-0 top-1/2 translate-y-[-50%] leading-[0.7rem]">
                  60%<br/>
                  OFF
                </p>
              </div>
              <Image
                src={info.product.image4}
                width={120}
                height={120}
                alt="Quantity 1"
              />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center text-right mr-10 w-full my-auto">
              <p className="text-[12px] relative w-fit ml-auto strikethrough-diagonal">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice4)}
                  countryCode={country}
                  digits={0}
                />
              </p>
              <p className="text-[20px] font-bold" id="price1">
                {/* ${price1.toFixed(2)} */}
                <PriceDisplaySimple
                  priceUSD={price4}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[14px] text-[#5acd65] font-bold">
                You Save <PriceDisplaySimple priceUSD={Math.abs(price4 - parseFloat(info.product.ogPrice4))} countryCode={country} digits={2} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantitySelector;
