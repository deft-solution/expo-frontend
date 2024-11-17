import { IOrderRequestParams } from '@/models/Order';
import { ICheckoutForm } from '@/schema/Checkout';
import { createOrder } from '@/service/order';

export interface OrderParam {
  event: string;
  userId: string;
  paymentId: string;
}

export const onSubmitOrder = (param: ICheckoutForm, orderInfo: OrderParam) => {
  const order: IOrderRequestParams = {
    firstName: param.firstName,
    lastName: param.lastName,
    email: param.email,
    companyName: param.companyName,
    patentUrl: param.patentUrl ?? null,
    phoneNumber: param.phoneNumber,
    nationality: param.nationality,
    note: 'Created Order',
    provider: param.provider,
    paymentCard: param.paymentCard,
    option: param.option,
    paymentId: orderInfo.paymentId,
    event: orderInfo.event,
    userId: orderInfo.userId,
    booths: [
      {
        boothId: param.passTemplate,
        quantity: param.quantity,
      },
    ],
  };

  return createOrder(order);
};
