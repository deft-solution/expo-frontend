import { GET } from '@/core';
import { PaymentOption } from '@/models/Payment';

export const getPaymentOptions = (): Promise<PaymentOption> => {
  const API_URL = '/wonderpass-api/v1/users/payment-options';
  return GET<PaymentOption>(API_URL);
};