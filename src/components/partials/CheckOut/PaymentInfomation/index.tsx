import Image from 'next/image';
import React from 'react';

import InputCoupon from '../InputCoupon';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { formatNumber } from '@/helper/format-number';
import { CalulcatedDataResponse } from '@/models/Payment';

export interface TypePropsPaymentInfo {
  paymentCalculated: CalulcatedDataResponse | null;
}

const PaymentInformation: React.FC<TypePropsPaymentInfo> = (props) => {
  const { paymentCalculated } = props;
  const data = paymentCalculated?.data;
  const serviceFee = data?.orderDetails.serviceFee ?? 0;
  const subtotal = data?.orderDetails.subtotal ?? 0;
  const total = data?.orderDetails.total ?? 0;
  const { selectedBooth } = useBoothSelection();

  return (
    <div className="w-full h-max bg-[#F6F7FA] rounded-md">
      <div className="p-4 content flex flex-col gap-4">
        <section className="text-center border-b border-[#00000040] pb-4">
          <div>
            <div>Total Amount</div>
            {data?.orderDetails && (
              <h2 className="text-3xl mt-2 font-medium text-[#33A16E]">
                KHR {formatNumber(data.orderDetails.total * 4000)}
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
            {data?.orderDetails.orderItems.map((order) => {
              const title = order.passTemplate.title;
              const size = order.passTemplate.subtitle;
              return (
                <div key={order.passTemplate._id} className="flex justify-between">
                  <div>
                    <div className="font-bold text-xl">
                      {title} : <span>{selectedBooth?.boothType?.name}</span>
                    </div>
                    <div className="text-[#7b7c7d] text-xl">{size}</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-right">
                      <span className="mr-2">KHR</span>
                      {formatNumber((order.total ?? 0) * 4000)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-9">
            <InputCoupon />
          </div>
        </section>
        <section className=" border-b border-[#00000040] pb-4">
          <div className="flex flex-col gap-4 text-[#7b7c7d]">
            <div className="flex items-center justify-between">
              <div>Sub Total</div>
              <div>
                <span className="mr-2">KHR</span>
                {formatNumber(subtotal * 4000)}
              </div>
            </div>
            {serviceFee > 0 && (
              <div className="flex items-center justify-between">
                <div>Service Fee</div>
                <div>KHR {formatNumber(serviceFee * 4000)}</div>
              </div>
            )}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <div className="text-xl font-medium">Total</div>
            <div className="font-medium text-[#33A16E] text-xl">
              <span>KHR </span>
              <span className="ml-1">{formatNumber((total ?? 0) * 4000)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentInformation;