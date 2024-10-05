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