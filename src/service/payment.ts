import { GET, POST } from '@Core';
import {
  CalulcatedDataResponse,
  CheckOutFormParam,
  CheckoutSuccess,
  ICalulcatedOrder,
  PaymentOption,
  ValidatePassesResponse,
} from '@/models/Payment';
import { getWonderPassToken } from '@/helper';

export const getPaymentOptions = (): Promise<PaymentOption> => {
  const API_URL = '/wonderpass-api/v1/users/payment-options';
  return GET<PaymentOption>(API_URL);
};

export const calculatedCheckOut = (params: ICalulcatedOrder): Promise<CalulcatedDataResponse> => {
  const API_URL = '/wonderpass-api/v1/payments/calculated-checkout-data';
  const token = getWonderPassToken();
  const header = { Authorization: token };
  return POST<CalulcatedDataResponse, ICalulcatedOrder>(API_URL, params, header);
};

export const submitPayment = (param: CheckOutFormParam): Promise<CheckoutSuccess> => {
  const API_URL = '/wonderpass-api/v1/payments/checkout-quantity';
  const token = getWonderPassToken();
  const header = { Authorization: token };
  return POST<CheckoutSuccess, CheckOutFormParam>(API_URL, param, header);
};

export const validatePaymentById = (paymentId: string): Promise<ValidatePassesResponse> => {
  const API_URL = `/wonderpass-api/v1/payments/validate/${paymentId}`;
  const token = getWonderPassToken();
  const header = { Authorization: token };
  return GET<ValidatePassesResponse>(API_URL, {}, header);
};
