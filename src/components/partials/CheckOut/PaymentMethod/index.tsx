import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { getPaymentOptionsForCheckOut } from '@/actions/payment';
import { PaymentOptionFormat } from '@/models/Payment';
import { useApi } from '@Core';
import Link from 'next/link';
import { getAcceptPayments } from '@/helper/config';
import getConfig from 'next/config';

const SelectPaymentMethod = () => {
  const providerName = 'provider';
  const optionName = 'option';
  const paymentCard = 'paymentCard';

  const publicRuntimeConfig = getConfig();

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
      const allowPayments = getAcceptPayments();

      const acceptPayment = response.filter(({ key }) => allowPayments.includes(key));

      setPayments(acceptPayment);
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
    <div className="flex flex-col gap-4 my-4">
      <div>
        <label htmlFor="">Payment Method</label>
        <div className="flex mt-4">
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
      <button
        type="submit"
        className={classNames('w-full h-[48px] mt-4 text-white rounded-md bg-[#33A16E]', {
          'bg-[#d9d9d9]': activeIdx === -1,
        })}
      >
        {activeIdx === -1 ? 'Please Select Payment Method' : 'Confirm to Pay'}
      </button>
      <div className="flex justify-between items-center text-sm">
        <div>
          <Link href="/">Term | Privacy</Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Powered by:</span>
          <Image
            src="/assets/logo/wonderpass.svg"
            alt="/assets/logo/wonderpass.svg"
            width={100}
            height={60}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
