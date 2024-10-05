'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import PaymentDetail from '@/components/partials/CheckOut/PaymentDetails';
import PaymentInformation from '@/components/partials/CheckOut/PaymentInfomation';
import PaymentStep from '@/components/partials/CheckOut/PaymentStep';
import { CheckOutForm, ICheckoutForm } from '@/schema/Checkout';
import { Form, Header } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckOutSuccess from '@/components/partials/CheckOut/CheckOutSuccess';
import SuccessSign from '@/components/partials/CheckOut/SuccessSign';

const PageCheckOut = () => {
  const methods = useForm({ resolver: yupResolver(CheckOutForm) });
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const onSubmitForm = (data: ICheckoutForm) => {
    console.log(data);
  };

  return (
    <div>
      <Header />
      <Form methods={methods} onSubmit={onSubmitForm}>
        <PaymentStep />
        <div className="container mx-auto max-md:px-4">
          {!isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <PaymentDetail />
              <PaymentInformation />
            </div>
          )}

          {isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <SuccessSign className="col-span-1 md:col-span-2 items-center flex flex-col gap-5" />
              <CheckOutSuccess />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PageCheckOut;
