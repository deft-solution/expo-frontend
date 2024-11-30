import Image from 'next/image';
import React, { useEffect } from 'react';

import { useBoothSelection } from '@/context/BoothSelectionContext';
import { formatNumberByCurrency, formatNumberUSD } from '@/helper/format-number';

import InputCoupon from '../InputCoupon';
import { IOrderCalculatedResponse } from '@/models/Order';

export interface TypePropsPaymentInfo {
  paymentCalculated: IOrderCalculatedResponse | null;
}

const PaymentInformation: React.FC<TypePropsPaymentInfo> = (props) => {
  const { paymentCalculated } = props;
  const totalAmount = paymentCalculated?.totalAmount;
  const currency = paymentCalculated?.currency;
  const booths = paymentCalculated?.booths ?? [];

  return (
    <div className="w-full h-max bg-[#F6F7FA] rounded-md">
      <div className="p-4 content flex flex-col gap-4">
        <section className="text-center border-b border-[#00000040] pb-4">
          <div>
            <div className="font-bold">Total Amount</div>
            {totalAmount && (
              <h2 className="text-3xl mt-2 font-bold text-[#33A16E]">
                {formatNumberByCurrency(totalAmount, currency)}
              </h2>
            )}
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
            {booths.map((booth) => {
              return (
                <div key={booth.boothId} className="flex justify-between">
                  <div>
                    <div className="font-bold text-xl">
                      {booth.boothName} : <span>{booth.boothTypeName}</span>
                    </div>
                    <div className="text-[#7b7c7d] text-xl">{booth.size}</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-right">
                      {formatNumberByCurrency(booth.convertedPrice, currency)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="mt-9">
            <InputCoupon />
          </div> */}
        </section>
        <section className=" border-b border-[#00000040] pb-4">
          <div className="flex flex-col gap-4 text-[#7b7c7d]">
            <div className="flex items-center justify-between">
              <div>Sub Total</div>
              <div>{totalAmount && formatNumberByCurrency(totalAmount ?? 0, currency)}</div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Total</div>
            <div className="font-medium text-[#33A16E] text-xl">
              <span className="ml-1">
                {totalAmount && formatNumberByCurrency(totalAmount ?? 0, currency)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentInformation;
