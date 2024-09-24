import * as yup from 'yup';

import { hasSendEmailVerificationSuccess } from '@/actions/Authentication';
import { isValidEmailFormat } from '@/helper';

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IValidatingEmail {
  email: string;
  code: string | null;
}

export interface IVerificationCodeParam {
  email: string;
  code: string;
}

// Define a validation schema with Yup
export const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Define a validation schema with Yup
export const EmailValidationSignUp = yup.object().shape({
  email: yup
    .string()
    .email('Email is Invalid.')
    .required('Email is required'),

  code: yup
    .string()
    .notRequired()
    .length(6, 'OTP code must be exactly 6 digits')
    .default(null),
});

// Define a validation schema with Yup
export const ValidateEmail = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .length(6, 'OTP code must be exactly 6 digits')
    .required('Email is required')
    .test('checkEmailExists', 'Email already exists', async (email: string) => {
      if (!isValidEmailFormat(email)) {
        return false;
      }
      const hasSentEmailVerification = await hasSendEmailVerificationSuccess(email); // Replace with actual API call
      return hasSentEmailVerification;
    }),

  code: yup
    .string()
    .when('email', {
      is: (email: string | undefined) => Boolean(email),
      // Define the schema that will apply based on the condition
      then: (schema) => schema
        .length(6, 'OTP code must be exactly 6 digits')
        .required('OTP code is required'),
      // For the case when the condition is false
      otherwise: (schema) => schema.notRequired(),
    }),
  //

  firstName: yup
    .string()
    .when(['email', 'code'], {
      is: (email: string | undefined, code: string | undefined) => Boolean(email && code),
      then: (schema) => schema.required('First name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

  lastName: yup
    .string()
    .when(['email', 'code'], {
      is: (email: string | undefined, code: string | undefined) => Boolean(email && code),
      then: (schema) => schema.required('Last name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .when(['email', 'code'], {
      is: (email: string | undefined, code: string | undefined) => Boolean(email && code),
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
});