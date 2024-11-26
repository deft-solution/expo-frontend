import { TypeCurrency } from '@/constants/Currency';
import { string } from 'yup';

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

export interface IOrder {
  companyName: string;
  completedAt: null | string;
  createdAt: null | string;
  createdBy: null | string;
  currency: string;
  email: string;
  event: {
    createdAt: null | string;
    createdBy: null | string;
    description: string;
    email: string | null;
    endDate: string | null;
    floorPlanUrl: string;
    id: string;
    isActive: boolean;
    location: string;
    logoUrl: string;
    mainWebsiteUrl: string;
    maxBoothPerOrder: number;
    name: string;
    phoneNumber: string | null;
    startFrom: string | null;
    updatedAt: string | null;
  };
  firstName: string;
  ip: string;
  items: {
    boothId: {
      boothName: string;
      boothNumber: string;
      boothType: string;
      createdAt: string;
      createdBy: string;
      description: string;
      event: string;
      externalId: string;
      hall: string;
      id: string;
      isActive: boolean;
      isReserved: boolean;
      mapUrl: null | string;
      price: number;
      size: string;
      updatedAt: string;
    };
    boothTypeCurrency: string;
    currency: string;
    price: number;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    _id: string;
  }[];
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
