import { IGenerateQRCodeSuccess } from '@/models/Payment';
import { IOrderRequestParams } from '@/schema/Checkout';
import { createOrder } from '@/service/order';
import { createQRCodePayment } from '@/service/payment';

export interface OrderParam {
  event: string;
  userId: string;
  paymentId: string;
}

export const onCreateOrder = (
  param: IOrderRequestParams
): Promise<IGenerateQRCodeSuccess | undefined> => {
  param['note'] = param.note ?? 'Created Order';
  return createOrder(param).then((response) => {
    if (!response) {
      return;
    }
    return createQRCodePayment({
      event: response.event,
      orderId: response._id,
      note: param.note ?? null,
    });
  });
};
