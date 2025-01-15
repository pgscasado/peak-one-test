'use client';
import { FireIcon } from '@heroicons/react/24/solid';
import React from 'react';
function HighDemandSection() {
  const customerQuantity = 60 + Math.random() * 40;
  return (
    <div className='flex w-full p-2 text-[14px] bg-[#ffe7e7] items-center justify-center'>
      <span className='text-red-500 font-bold flex mr-1'><FireIcon className='w-4 h-4 my-auto'/> High Demand:</span> {customerQuantity.toFixed(0)} people are looking this offer!
    </div>
  );
}

export default React.memo(HighDemandSection);