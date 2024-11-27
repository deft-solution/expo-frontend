import { TypeCurrency } from '@/constants/Currency';
import { IBooth } from '@/schema/Booth';
import { IBootTypeList } from '@/schema/BoothType';
import { IEvents } from '@/schema/Event';

export interface Event extends IEvents {
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface BoothId extends IBooth {
  mapUrl: any;
  event: string;
  boothType: IBootTypeList;
}

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
  boothId: string | BoothId;
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

export interface IOrderResponse {
  companyName: string;
  completedAt: null | string;
  createdAt: null | string;
  createdBy: null | string;
  currency: string;
  email: string;
  event: Event;
  firstName: string;
  ip: string;
  items: Item[];
  lastName: string;
  nationality: string;
  note: string;
  orderNo: string;
  patentUrl: null | string;
  paymentMethod: number;
  paymentStatus: number;
  phoneNumber: string;
  status: number;
  totalAmount: number;
  updatedAt: string;
  __v: number;
  _id: string;
}
