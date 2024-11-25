import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useCheckout } from '@/context/CheckOutContext';
import { usePaymentContext } from '@/context/PaymentOptionsContext';
import { getAcceptPayments } from '@/helper/config';
import { PaymentOptionFormat } from '@/models/Payment';
import { Button } from '@Core';

const SelectPaymentMethod = () => {
  const providerName = 'provider';
  const optionName = 'option';
  const paymentCard = 'paymentCard';
  const { paymentOptions } = usePaymentContext();
  const { submissionStatus } = useCheckout();

  const [payments, setPayments] = useState<PaymentOptionFormat[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  register(providerName);
  register(optionName);
  register(paymentCard);

  useEffect(() => {
    if (paymentOptions) {
      const allowPayments = getAcceptPayments();
      const acceptPayment = paymentOptions.filter(({ key }) => allowPayments.includes(key));

      setPayments(acceptPayment);
    }
  }, [paymentOptions]);

  const onSelectPayment = (idx: number) => {
    const payment = payments[idx];
    setActiveIdx(idx);
    //
    setValue(providerName, payment.provider, { shouldValidate: true });
    setValue(optionName, payment.key, { shouldValidate: true });
    setValue(paymentCard, payment._id, { shouldValidate: true });
  };

  const error = providerName.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div>
        <label htmlFor="">Payment Method</label>
        <div className="grid grid-cols-2 mt-4 gap-4">
          {payments.map((payment, idx) => {
            const logo = payment.logo;
            return (
              <div
                key={payment._id}
                onClick={() => onSelectPayment(idx)}
                className={classNames(
                  'flex items-center border gap-6 justify-center border-gray-200 p-6 rounded-2xl cursor-pointer',
                  { 'bg-[#d9d9d9]': activeIdx === idx }
                )}
              >
                {logo.imageUrl && (
                  <Image src={logo.imageUrl} alt={logo.imageUrl} width={24} height={24} />
                )}
                <div>{payment.title}</div>
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
