'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { onCreateOrder } from '@/actions/Order';
import CheckOutSuccess from '@/components/partials/CheckOut/CheckOutSuccess';
import PaymentDetail from '@/components/partials/CheckOut/PaymentDetails';
import PaymentInformation from '@/components/partials/CheckOut/PaymentInfomation';
import PaymentStep from '@/components/partials/CheckOut/PaymentStep';
import SuccessSign from '@/components/partials/CheckOut/SuccessSign';
import { useBoothSelection } from '@/context/BoothSelectionContext';
import { useCheckout } from '@/context/CheckOutContext';
import { useCalculatedCheckout } from '@/hooks/useCalculatedCheckout';
import { usePaymentPolling } from '@/hooks/usePaymentPolling';
import { IGenerateQRCodeSuccess } from '@/models/Payment';
import { IOrderRequestParams, OrderRequestParamsSchema } from '@/schema/Checkout';
import { Form, Modal, QRCode } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const PageCheckOut: React.FC = () => {
  const methods = useForm<IOrderRequestParams>({
    resolver: yupResolver(OrderRequestParamsSchema),
    defaultValues: { currency: 'KHR' },
  });
  const { setValue, watch } = methods;
  //
  const { selectedBoothIds, currentEventId } = useBoothSelection();

  const [isSubmitModalVisible, setSubmitModalVisibility] = useState(false);
  const [khqrPayment, setKHQRPayment] = useState<IGenerateQRCodeSuccess | null>(null);
  const currency = watch('currency');

  useEffect(() => {
    if (currentEventId) {
      setValue('event', currentEventId);
    }

    if (selectedBoothIds.length) {
      const booths = selectedBoothIds.map((id) => ({ boothId: id, quantity: 1 }));
      setValue('booths', booths);
    }
  }, [selectedBoothIds.length, currentEventId]);

  useEffect(() => {
    setCurrency(currency);
  }, [currency]);

  const onSuccessPayment = () => {
    setSubmitModalVisibility(false);
  };

  const { response, isSuccess, setPaymentId, startPolling, cancelPolling } = usePaymentPolling({
    onSuccess: onSuccessPayment,
  });

  //
  const { finishSubmitting, startSubmitting } = useCheckout();
  const { response: calculatedPayment, setCurrency } = useCalculatedCheckout();

  const handleFormSubmit: SubmitHandler<IOrderRequestParams> = (data) => {
    startSubmitting();
    onCreateOrder(data)
      .then((response) => {
        if (response && response.qrCode) {
          setKHQRPayment(response);
          setPaymentId(response.id);
          setSubmitModalVisibility(true);
          startPolling();
        }
        finishSubmitting();
      })
      .catch((err) => {
        alert(err.message ?? 'Something went wrong');
      })
      .finally(() => {
        finishSubmitting();
      });
  };

  const handleModalClose = () => {
    setSubmitModalVisibility(false);
    cancelPolling();
  };

  return (
    <div className="max-md:mb-10">
      <Modal
        contentClassName="max-w-[400px] !h-[600px]"
        onClickOutSide={handleModalClose}
        visible={isSubmitModalVisible}
      >
        {khqrPayment && khqrPayment.amount > 0 && khqrPayment.currency && (
          <div className="flex h-full items-center justify-center">
            <QRCode
              amount={khqrPayment.amount}
              currency={khqrPayment.currency}
              onCountDownFinished={handleModalClose}
              value={khqrPayment.qrCode}
            />
          </div>
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
              <CheckOutSuccess orderResponse={response} />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PageCheckOut;
