import { TypeCurrency } from '@/constants/Currency';

export interface IOrderRequestParams {
  event: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  patentUrl?: string | null;
  note?: string | null;
  nationality: string;
  paymentMehtod: number;
  booths: IOrderBooths[];
}

export interface IOrderBooths {
  quantity: number;
  boothId: string;
}

export interface CreateOrderResponse {
  ip: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  option: string;
  paymentCard: string;
  provider: number;
  email: string;
  paymentId: string;
  companyName: string;
  patentUrl: any;
  nationality: string;
  totalAmount: number;
  orderNo: string;
  paymentMethod: string;
  currency: string;
  status: number;
  paymentStatus: number;
  note: string;
  event: string;
  items: Item[];
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  __v: number;
}

export interface Item {
  boothId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  _id: string;
}

export interface IOrderCalculatedRequest {
  currency: TypeCurrency;
  event: string;
  booths: IOrderBooths[];
}

export interface IOrderCalculatedResponse {
  totalAmount: number;
  booths: ICalculatedBooth[];
  currency: TypeCurrency;
}

export interface ICalculatedBooth {
  boothId: string;
  price: number;
  boothName: string;
  boothTypeName: string;
  convertedPrice: number;
  originCurrency: string;
  size: string;
  quantity: number;
}
