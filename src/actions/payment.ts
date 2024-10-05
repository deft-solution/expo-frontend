import { PaymentOptionData, PaymentOptionFormat, PaymentOptionItem } from '@/models/Payment';
import { getPaymentOptions } from '@/service/payment';

export const getPaymentOptionsForCheckOut = (): Promise<PaymentOptionFormat[]> => {
  return getPaymentOptions().then((response) => {
    return flatMapPaymentItem(response.data);
  });
};

const flatMapPaymentItem = (payments: PaymentOptionData[]): PaymentOptionFormat[] => {
  return payments.flatMap((item: PaymentOptionData) =>
    item.options.map((option: PaymentOptionItem): PaymentOptionFormat => {
      return {
        ...option,
        type: item.type,
        provider: item.provider,
        isPrimary: item.isPrimary,
      };
    })
  );
};