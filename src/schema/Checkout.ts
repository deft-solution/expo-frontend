import { TypeCurrency } from '@/constants/Currency';
import * as yup from 'yup';

export interface IOrderBooth {
  boothId: string; // Required
  quantity: number; // Required, must be a positive integer
}

export interface IOrderRequestParams {
  currency: TypeCurrency;
  event: string; // Required, must be a valid ObjectId
  firstName: string; // Required, minimum length 2
  lastName: string; // Required, minimum length 2
  phoneNumber: string; // Required, must match a specific pattern
  companyName: string; // Required
  nationality: string; // Required
  patentUrl: string | null; // Nullable
  note?: string | null; // Nullable
  paymentMethod: number; // Required
  email: string; // Required, must be a valid email
  booths: IOrderBooth[]; // Required, at least one booth
}

// Yup schema for IOrderBooths (assuming it has specific fields)
const OrderBoothsSchema = yup.object({
  boothId: yup.string().required('Booth ID is required'), // Example field
  quantity: yup
    .number()
    .integer('Quantity must be an integer')
    .positive('Quantity must be a positive number')
    .required('Quantity is required'),
});

// Define a validation schema with Yup
export const OrderRequestParamsSchema = yup.object({
  currency: yup
    .string()
    .oneOf(['KHR', 'USD'], 'Currency must be either KHR or USD')
    .required('Currency is required'),
  event: yup.string().required('Event is required'),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long'),
  phoneNumber: yup.string().required('Phone number is required'),
  companyName: yup.string().required('Company Name is a required field'), // Optional and allows null values
  nationality: yup.string().required('Nationality is a required field'), // Optional and allows null values
  patentUrl: yup.string().nullable().default(null),
  note: yup.string().nullable(),
  paymentMethod: yup.number().required('Payment method is required'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  booths: yup
    .array()
    .of(OrderBoothsSchema)
    .required('Booths are required')
    .min(1, 'At least one booth must be selected'),
});
