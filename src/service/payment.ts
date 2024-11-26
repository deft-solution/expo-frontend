import { getWonderPassToken } from '@/helper';
import {
  CalculatedDataResponse,
  CheckOutFormParam,
  CheckoutSuccess,
  ICalculatedOrder,
  ICreatePaymentQRCode,
  IGenerateQRCodeSuccess,
  IVerifyTransactionSucess,
  PaymentOption,
  ValidatePassesResponse,
} from '@/models/Payment';
import { GET, POST } from '@Core';

export const getPaymentOptions = (): Promise<PaymentOption> => {
  const API_URL = '/wonderpass-api/v1/users/payment-options';
  return GET<PaymentOption>(API_URL);
};

export const calculatedCheckOut = (params: ICalculatedOrder): Promise<CalculatedDataResponse> => {
  const API_URL = '/wonderpass-api/v1/payments/calculated-checkout-data';
  const token = getWonderPassToken();
  const header = { Authorization: token };
  return POST<CalculatedDataResponse, ICalculatedOrder>(API_URL, params, header);
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

export const verifyPaymenyTransaction = (
  transactionId: string
): Promise<IVerifyTransactionSucess> => {
  const API_URL = '/api/payments/v1/status';
  return POST<IVerifyTransactionSucess, { transactionId: string }>(API_URL, { transactionId });
};

export const createQRCodePayment = (
  param: ICreatePaymentQRCode
): Promise<IGenerateQRCodeSuccess> => {
  const API_URL = '/api/payments/v1/qrcode';
  return POST<IGenerateQRCodeSuccess, ICreatePaymentQRCode>(API_URL, param);
};
