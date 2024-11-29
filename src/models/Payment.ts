import { TypeCurrency } from '@/constants/Currency';
import { Payments } from '@/enums/payments';
import { BaseResponse } from '@/schema/Wonderpass/Base';

export interface PaymentOptionItem {
  logo: Logo;
  fallback?: Fallback;
  _id: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  serviceCharge?: {
    value: number;
    type: number;
    minimum: number;
  };
  provider: number;
  type: string;
  promotions: PromotionTag[];
}

export interface PaymentOptionFormat extends PaymentOptionItem {
  isPrimary: boolean;
  provider: number;
  type: string;
}

export interface PaymentOption {
  data: PaymentOptionData[];
  statusCode: number;
  message: string;
}

interface PromotionTag {
  _id: string;
  isCashback: boolean;
  name: string;
  label: string;
}

export interface PaymentOptionData {
  isPrimary: boolean;
  options: PaymentOptionItem[];
  provider: number;
  type: string;
}
export interface Fallback {
  ios: string;
  android: string;
  web: string;
}

export interface Logo {
  name: string;
  imageUrl: string;
}

export interface CardImage {
  name: string;
  imageUrl: string;
}

export interface ICalculatedOrder {
  orderItems: OrderItem[];
  reservationDate: string | null;
  //
  provider?: number;
  option?: string;
  paymentCard?: string;
}

export interface OrderItem {
  boothId: string;
  quantity: number;
}

export interface CalculatedDataResponse extends BaseResponse {
  data: { shippingMethods: any; orderDetails: OrderDetails };
}

export interface OrderDetails {
  rewardItems: any[];
  cashbackFees: any[];
  additionalFees: any[];
  promotionAdditionFees: any[];
  orderItems: OrderItemResponse[];
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  cashbackAmount: number;
  discountAmount: number;
  specialRequestAmount: number;
  total: number;
  promoCodeValidity: string;
}

export interface OrderItemResponse {
  passTemplate: PassTemplate;
  price: number;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  cashbackAmount: number;
  discountAmount: number;
  total: number;
}

export interface PassTemplate {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: Logo;
}

export interface CheckoutSuccess {
  code: string;
  paymentId: string;
}

export interface CheckOutFormParam {
  persons?: string[];
  passTemplate: string;
  seatIds?: string[];
  quantity: number;
  //
  provider: number | null;
  paymentCard: string | null;
  option: string | null;
  shippingMethod?: ShippingAddress | null;
  promoCode?: string | null;
  topUpNumber?: string | null;
  reservationDate?: {
    startDate?: string | null;
    endDate?: string | null;
  };
  formValues?: any[];
}

export interface ShippingAddress {
  name: string;
  option: string;
  address: string;
  note: string;
  phone: string;
}

export type PaymentProvider = keyof typeof Payments;

export interface ValidatePassesResponse {
  data: number;
  statusCode: number;
  message: string;
}

export interface ICreatePaymentQRCode {
  orderId: string;
  event: string;
  note: string | null;
}

export interface IGenerateQRCodeSuccess {
  id: string;
  qrCode: string;
  metaData: string;
  amount: number;
  transactionNo: string;
  currency: TypeCurrency;
  createdAt: string;
}

export interface IVerifyTransactionSuccess {
  orderId: string;
  transactionNo: string;
  createdAt: string;
  sender: string;
  amount: number;
  paymentTimestamp: string;
  currency: TypeCurrency;
  status: number;
}
