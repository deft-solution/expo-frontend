import Image from 'next/image';
import React from 'react';

import InputCoupon from '../InputCoupon';

const PaymentInformation = () => {
  return (
    <div className="w-full h-max bg-[#F6F7FA] rounded-md">
      <div className="p-4 content flex flex-col gap-4">
        <section className="text-center border-b border-[#00000040] pb-4">
          <div>
            <div>Total Amount</div>
            <h2 className="text-3xl mt-2 font-medium text-[#33A16E]">
              KHR 1,800,000
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-4 justify-center color-[#999a9c]">
            <Image
              src="/assets/icons/secure.svg"
              alt="/assets/icons/secure.svg"
              width={19}
              height={19}
            />
            <span className="text-[#7b7c7d]">Secure Payment</span>
          </div>
        </section>
        <section className=" border-b border-[#00000040] pb-4">
          <div className="flex flex-col gap-4">
            <div className="text-[#7b7c7d] font-bold">Order Summary</div>
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-xl">Standard Booth: Type A</div>
                <div className="text-[#7b7c7d] text-xl">3m X 3m</div>
              </div>
              <div>
                <div className="font-bold text-xl text-right">
                  KHR 1,800,000
                </div>
              </div>
            </div>
          </div>
          <div className="mt-9">
            <InputCoupon />
          </div>
        </section>
        <section className=" border-b border-[#00000040] pb-4">
          <div className="flex flex-col gap-4 text-[#7b7c7d]">
            <div className="flex items-center justify-between">
              <div>Sub Total</div>
              <div>KHR 1,800,000</div>
            </div>
            <div className="flex items-center justify-between">
              <div>VAT 10%</div>
              <div>KHR 15,000</div>
            </div>
            <div className="flex items-center justify-between">
              <div>MDR Fee</div>
              <div>KHR 15,000</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Service Fee</div>
              <div>KHR 15,000</div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <div className="text-xl font-medium">Total</div>
            <div className="font-medium text-[#33A16E] text-xl">
              KHR 1,815,000
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentInformation;
