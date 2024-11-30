import * as payment from '@/constants/Payment';

export const formatPaymentMethod = (method: number) => {
  switch (method) {
    case payment.USD_KHQR:
      return 'USD KHQR';
    case payment.KHR_KHQR:
      return 'KHR KHQR';
    default:
      return '';
  }
};
