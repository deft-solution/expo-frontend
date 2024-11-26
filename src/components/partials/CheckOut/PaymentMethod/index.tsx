import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useCheckout } from '@/context/CheckOutContext';
import { usePaymentContext } from '@/context/PaymentOptionsContext';
import { getAcceptPayments } from '@/helper/config';
import { PaymentOptionFormat } from '@/models/Payment';
import { Button } from '@Core';
import { PAYMENT_LIST } from '@/constants/Payment';

const SelectPaymentMethod = () => {
  const name = 'paymentMethod';
  const payments = PAYMENT_LIST;
  const { submissionStatus } = useCheckout();
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  register(name);

  const onSelectPayment = (idx: number) => {
    const payment = payments[idx];
    setActiveIdx(idx);
    //
    setValue('currency', payment.currency);
    setValue(name, payment.id, { shouldValidate: true });
  };

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div>
        <label htmlFor="">Payment Method</label>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {payments.map((payment, idx) => {
            const logo = payment.imageUrl;
            return (
              <div
                key={idx}
                onClick={() => onSelectPayment(idx)}
                className={classNames(
                  'flex items-center border gap-6 justify-center border-gray-200 p-6 rounded-2xl cursor-pointer',
                  { 'bg-[#d9d9d9]': activeIdx === idx }
                )}
              >
                {logo && <Image src={logo} alt={logo} width={24} height={24} />}
                <div>{payment.name}</div>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
      </div>
      <Button
        type="submit"
        disabled={submissionStatus || activeIdx === -1}
        theme="success"
        className={classNames('w-full h-[48px] mt-4', {
          'bg-[#d9d9d9]': activeIdx === -1,
        })}
      >
        <span className="transition-opacity duration-300 ease-in-out">
          {submissionStatus && 'Processing your payment... Please wait.'}
          {!submissionStatus && activeIdx === -1 && 'Please select a payment method'}
          {!submissionStatus && activeIdx !== -1 && 'Confirm your payment'}
        </span>
      </Button>
    </div>
  );
};

export default SelectPaymentMethod;
