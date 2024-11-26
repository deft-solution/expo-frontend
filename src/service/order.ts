import {
  CreateOrderResponse,
  IOrderCalculatedRequest,
  IOrderCalculatedResponse,
} from '@/models/Order';
import { IOrderRequestParams } from '@/schema/Checkout';
import { GET, POST, PUT } from '@Core';

export const createOrder = (param: IOrderRequestParams): Promise<CreateOrderResponse> => {
  const API_URL = '/api/orders/v1/create';
  return POST<CreateOrderResponse, IOrderRequestParams>(API_URL, param);
};

export const orderIsCompleted = (orderId: string): Promise<void> => {
  const API_URL = `/api/orders/v1/${orderId}/completed`;
  return PUT<void, any>(API_URL, {}, {});
};

export const calculatedTotalAmount = (
  params: IOrderCalculatedRequest
): Promise<IOrderCalculatedResponse> => {
  const API_URL = '/api/orders/v1/calculated';
  return POST<IOrderCalculatedResponse, any>(API_URL, params);
};

export const downloadOrderPDF = (): Promise<Blob> => {
  const API_URL = '/api/orders/v1/pdf/receipts';
  return GET<Blob, any>(API_URL, {}, {}, { responseType: 'blob' });
};
