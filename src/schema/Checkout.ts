import * as yup from 'yup';

export interface ICheckoutForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  provider: number;
  option: string;
  quantity: number;
  passTemplate: string;
}

// Define a validation schema with Yup
export const CheckOutForm = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  quantity: yup.number().default(1).optional(),
  passTemplate: yup.string().required('Pass template cant be null'),
  phoneNumber: yup
    .string()
    .matches(/^(0[1-9]{1}[0-9]{7,8}|(\+855)[1-9]{1}[0-9]{7,8})$/, 'Invalid Cambodian phone number')
    .required('Phone number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  provider: yup.number().required('Please kindly select your payment method.'),
  option: yup.string().required('Please kindly select your payment method.'),
  paymentCard: yup.string().required('Please kindly select your payment method.'),
});

export const OrderItemSchema = yup.object().shape({
  passTemplate: yup.string().required('Pass template is required'),
  quantity: yup.number().positive().default(1).integer().required('Quantity is required'),
});

export const CalculatedOrderSchema = yup.object().shape({
  orderItems: yup.array().of(OrderItemSchema).required('Order items are required'),
  reservationDate: yup.string().nullable().required('Reservation date is required'),
  provider: yup.number().optional(),
  option: yup.string().optional(),
  paymentCard: yup.string().optional(),
});
