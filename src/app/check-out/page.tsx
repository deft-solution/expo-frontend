'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { onSubmitOrder } from '@/actions/Order';
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

const PageCheckOut: React.FC = () => {
  const { ids, eventId, selectedBooth } = useBoothSelection();

  const methods = useForm<ICheckoutForm>({
    resolver: yupResolver(CheckOutForm),
  });

  const { watch, setValue } = methods;
  const { provider, option, paymentCard } = watch();

  const [payment, setPayment] = useState<IPayments>();
  const [paymentCode, setPaymentCode] = useState<string | null>(null);
  const [isSubmitModalVisible, setSubmitModalVisibility] = useState(false);
  const { userId } = useAuthLive();

  const { response: calculatedPayment } = useCalculatedCheckout({ payment });

  const onSuccessPayment = async () => {
    setSubmitModalVisibility(false);
  };

  const { setPaymentId, paymentId, isSuccess, startPolling, setOrderId, cancelPolling } =
    usePaymentPolling({
      onSuccess: onSuccessPayment,
    });

  const token = getWonderPassToken()?.split(' ');

  const handleFormSubmit: SubmitHandler<ICheckoutForm> = (data) => {
    if (!eventId) {
      return;
    }

    submitPayment(data)
      .then(async (response) => {
        await submitOrder(data, response.paymentId);
        setPaymentCode(response.code);
        setPaymentId(response.paymentId);
        startPolling();
        setSubmitModalVisibility(true);
      })
      .catch((error) => {
        if (error?.message) {
          alert(`Error: ${error.message}`);
        }
      });
  };

  useEffect(() => {
    setPayment({ provider, option, paymentCard });
  }, [provider, option, paymentCard]);

  useEffect(() => {
    setValue('passTemplate', ids[0]);
  }, [ids, setValue]);

  const handleModalClose = () => {
    setSubmitModalVisibility(false);
    cancelPolling();
  };

  // Submit order after payment
  const submitOrder = async (data: ICheckoutForm, paymentId: string) => {
    try {
      if (!eventId || !userId || !selectedBooth?.id) {
        return;
      }

      data['passTemplate'] = selectedBooth.id;

      const orderResponse = await onSubmitOrder(data, { event: eventId, userId, paymentId });
      if (orderResponse._id) {
        setOrderId(orderResponse._id);
      }
    } catch (error) {
      throw new Error('Error creating the order');
    }
  };

  return (
    <div className="max-md:mb-10">
      <Modal
        contentClassName="max-w-[800px] !h-[800px]"
        visible={isSubmitModalVisible}
        onClickOutSide={handleModalClose}
      >
        {token && token.length > 1 && (
          <iframe
            className="checkout-frame w-full h-full"
            src={`https://dev.wonderpass.asia/payment-processing?code=${paymentCode}&token=${token[1]}&platformType=2`}
          ></iframe>
        )}
      </Modal>

      {/* Main Checkout Form */}
      <Form methods={methods} onSubmit={handleFormSubmit}>
        <PaymentStep isCompleted={isSuccess} />
        <div className="container mx-auto xl:max-w-screen-xl max-md:px-4">
          {!isSuccess ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <PaymentDetail />
              <PaymentInformation paymentCalculated={calculatedPayment} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
              <SuccessSign className="col-span-1 md:col-span-2 items-center flex flex-col gap-5" />
              <CheckOutSuccess
                option={payment?.option}
                paymentRef={paymentId}
                paymentCalculated={calculatedPayment}
              />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PageCheckOut;
