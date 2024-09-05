import * as yup from 'yup';

export interface IAuthLogin {
  username: string;
  password: string;
}

// Define a validation schema with Yup
export const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});