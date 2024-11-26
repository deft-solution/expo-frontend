import { getWonderPassToken } from '@/helper';
import {
  ICreatePaymentQRCode,
  IGenerateQRCodeSuccess,
  IVerifyTransactionSuccess,
} from '@/models/Payment';
import { GET, POST } from '@Core';

export const verifyPaymentTransaction = (
  transactionId: string
): Promise<IVerifyTransactionSuccess> => {
  const API_URL = '/api/payments/v1/status';
  return POST<IVerifyTransactionSuccess, { transactionId: string }>(API_URL, { transactionId });
};

export const createQRCodePayment = (
  param: ICreatePaymentQRCode
): Promise<IGenerateQRCodeSuccess> => {
  const API_URL = '/api/payments/v1/qrcode';
  return POST<IGenerateQRCodeSuccess, ICreatePaymentQRCode>(API_URL, param);
};

export const verifyPaymenyTransaction = (
  transactionId: string
): Promise<IVerifyTransactionSuccess> => {
  const API_URL = '/api/payments/v1/status';
  return POST<IVerifyTransactionSuccess, { transactionId: string }>(API_URL, { transactionId });
};
