import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { getPaymentOptionsForCheckOut } from '@/actions/payment';
import { PaymentOptionFormat } from '@/models/Payment';
import { useApi } from '@Core';

const SelectPaymentMethod = () => {
  const providerName = 'provider';
  const optionName = 'option';
  const paymentCard = 'paymentCard';
  const [payments, setPayments] = useState<PaymentOptionFormat[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const { response } = useApi({
    service: getPaymentOptionsForCheckOut,
    effects: [],
    params: {},
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  register(providerName);
  register(optionName);
  register(paymentCard);

  useEffect(() => {
    if (response) {
      setPayments(response);
    }
  }, [response]);

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
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="">Payment Method</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {payments.map((payment, idx) => {
            const logo = payment.logo;
            return (
              <div
                key={payment._id}
                onClick={() => onSelectPayment(idx)}
                className={classNames(
                  'flex items-center border gap-3 border-gray-200 p-4 rounded-md cursor-pointer',
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
      <button type="submit" className="w-full rounded-md h-[48px] bg-[#33A16E] text-white">
        Confirm to Pay
      </button>
    </div>
  );
};

export default SelectPaymentMethod;