import * as yup from 'yup';

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IValidatingEmail {
  email: string;
  code: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
}

export interface IVerificationCodeParam {
  email: string;
  code: string;
}

// Define a validation schema with Yup
export const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Define a validation schema with Yup
export const EmailValidationSignUp = yup.object().shape({
  email: yup.string().email('Email is Invalid.').required('Email is required'),

  code: yup.string().notRequired().length(6, 'OTP code must be exactly 6 digits').default(null),
  firstName: yup.string().notRequired().default(null),
  lastName: yup.string().notRequired().default(null),
  password: yup
    .string()
    .default(null)
    .min(6, 'Password must be at least 6 characters')
    .notRequired(),
});
