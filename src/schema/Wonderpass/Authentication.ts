import { BaseResponse } from './Base';
import * as yup from 'yup';

export interface AuthInformation extends BaseResponse {
  data: {
    type: number;
    value: LoginValue;
  };
}

export interface LoginValue {
  _id: string;
  phone?: {
    phoneCode: string;
    phoneNumber: string;
  };
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  token: string;
}

export interface SendCodeSuccess extends BaseResponse {
  data: { type: number }[];
}

export interface ILoginEmailParam extends ILoginBase {
  email: string;
  password: string;
}

export interface ISendCodeForm extends ILoginBase {
  phoneCode: number;
  phoneNumber: number;
  code?: number;
}

export interface VerifyOTPParam extends ILoginBase {
  email?: string;
  phoneNumber?: Number;
  phoneCode?: Number;
  code: number;
}

export interface ILoginBase {
  deviceId: string | null;
  deviceName: string | null;
  osType: OSType;
  osVersion: string | null;
}

export type OSType = 'web' | 'android' | 'ios';

export const LoginEmailWonderPassSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  deviceId: yup.string().default(null).nullable(),
  deviceName: yup.string().default(null).nullable(),
  osType: yup.string().oneOf(['web', 'android', 'ios'], 'Invalid OS type').default('web'),
  osVersion: yup.string().default(null).nullable(),
});

export const SendCodeForm = yup.object().shape({
  phoneCode: yup.number().required('Phone code is required'),
  phoneNumber: yup.number().required('Phone number is required'),
  code: yup
    .number()
    .optional()
    .test('len', 'Code must be exactly 6 digits', (val) => !val || val.toString().length === 6), // Validate length of code
  deviceId: yup.string().default(null).nullable(),
  deviceName: yup.string().default(null).nullable(),
  osType: yup.string().oneOf(['web', 'android', 'ios'], 'Invalid OS type').default('web'),
  osVersion: yup.string().default(null).nullable(),
});
