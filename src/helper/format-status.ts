import * as payment from '@/constants/Payment';
import * as order from '@/constants/Order';

export const formatPaymentStatus = (status: number) => {
  switch (status) {
    case payment.PAYMENT_STATUS_PENDING:
      return 'Pending';
    case payment.PAYMENT_STATUS_COMPLETED:
      return 'Paid';
    case payment.PAYMENT_STATUS_FAILED:
      return 'Failed';
    default:
      return '';
  }
};

export const formatOrderStatus = (status: number) => {
  switch (status) {
    case order.ORDER_STATUS_PENDING:
      return 'Pending';
    case order.ORDER_STATUS_COMPLETED:
      return 'Completed';
    case order.ORDER_STATUS_CANCEL:
      return 'Canceled';
    default:
      return '';
  }
};
