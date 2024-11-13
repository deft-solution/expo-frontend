'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthenticationForm from '@/components/authentication';
import CheckOutSuccess from '@/components/partials/CheckOut/CheckOutSuccess';
import PaymentDetail from '@/components/partials/CheckOut/PaymentDetails';
import PaymentInformation from '@/components/partials/CheckOut/PaymentInfomation';
import PaymentStep from '@/components/partials/CheckOut/PaymentStep';
import SuccessSign from '@/components/partials/CheckOut/SuccessSign';
import { useAuthLive } from '@/context/AuthLiveContext';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { getWonderPassToken } from '@/helper';
import { IPayments, useCalculatedCheckout } from '@/hooks/useCalculatedCheckout';
import { usePaymentPolling } from '@/hooks/usePaymentPolling';
import { CheckOutForm, ICheckoutForm } from '@/schema/Checkout';
import { submitPayment } from '@/service/payment';
import { Form, Modal } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const PageCheckOut = () => {
  const { isAuthenticated } = useAuthLive();
  const { ids } = useBoothSelection();

  const methods = useForm({ resolver: yupResolver(CheckOutForm) });
  const { watch, setValue } = methods;

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [payment, setPayment] = useState<IPayments>();
  const [code, setCode] = useState<string | null>(null);
  const [submitModal, setShowSubmitModal] = useState<boolean>(false);

  const { response: calculatedPayment } = useCalculatedCheckout({ payment });

  const provider = watch('provider');
  const option = watch('option');
  const paymentCard = watch('paymentCard');
  //
  const token = getWonderPassToken()?.split(' ');

  const onSubmitForm = (data: ICheckoutForm) => {
    submitPayment(data as any)
      .then((reponse) => {
        setCode(reponse.code);
        setPaymentId(reponse.paymentId);
        setPolling(true);
        setShowSubmitModal(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    setShowAuthForm(!isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    setPayment({ provider, option, paymentCard });
  }, [paymentCard, option, provider]);

  useEffect(() => {
    setValue('passTemplate', ids[0]);
  }, [ids]);

  const cancelPayment = () => {
    setShowSubmitModal(false);
  };

  const { setPaymentId, isSuccess, setPolling, cancelPolling } = usePaymentPolling({
    onSuccess: cancelPayment,
  });

  const onClickOutSide = () => {
    setShowSubmitModal(false);
    cancelPolling();
  };

  return (
    <div className="max-md:mb-10">
      <Modal contentClassName="md:!max-w-md lg:!max-w-[40%]" visible={showAuthForm}>
        <AuthenticationForm />
      </Modal>
      <Modal
        contentClassName="max-w-[800px] !h-[800px]"
        visible={submitModal}
        onClickOutSide={onClickOutSide}
      >
        {token && token.length && (
          <iframe
            className="checkout-frame w-full h-full"
            src={`https://dev.wonderpass.asia/payment-processing?code=${code}&token=${token[1]}&platformType=2`}
          ></iframe>
        )}
      </Modal>
      <Form methods={methods} onSubmit={onSubmitForm}>
        <PaymentStep isCompleted={isSuccess} />
        <div className="container mx-auto xl:max-w-screen-xl max-md:px-4">
          {!isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <PaymentDetail />
              <PaymentInformation paymentCalculated={calculatedPayment} />
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
