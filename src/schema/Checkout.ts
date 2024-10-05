import * as yup from 'yup';

export interface ICheckoutForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  payment: string;
}

// Define a validation schema with Yup
export const CheckOutForm = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^(0[1-9]{1}[0-9]{7,8}|(\+855)[1-9]{1}[0-9]{7,8})$/, 'Invalid Cambodian phone number')
    .required('Phone number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  payment: yup.string().required('Please kindly select your payment method.'),
});
