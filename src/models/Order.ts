export interface IOrderRequestParams {
  event: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userId: string;
  email: string;
  companyName: string | null;
  patentUrl: string | null;
  nationality: string | null;
  note: string | null;
  paymentId: string;
  paymentCard: string;
  option: string;
  provider: number;
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
  __v: number;
}

export interface Item {
  boothId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  _id: string;
}
