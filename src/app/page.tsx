import React from "react";
import CheckoutPage from "./_components/checkout-page";
import CheckoutPageType2 from './_components/checkout-page2';
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { getCheckoutBySlug } from "@/app/_utils/api";
// import { baseCheckout } from "@/lib/site-info";

const baseCheckout = "splash-foam-checkout";

const montserrat = Montserrat({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const info = getCheckoutBySlug(baseCheckout);

  return {
    title: info.metaTitle,
    description: info.metaDescription,
  };
}

const Page = () => {
  const checkoutInfo = getCheckoutBySlug(baseCheckout);

  return (
    <div className={montserrat.className}>
      {
        checkoutInfo.template === "1" ?
          <CheckoutPage info={checkoutInfo} />
        : <CheckoutPageType2 info={checkoutInfo} />
      }
    </div>
  );
};

export default Page;
