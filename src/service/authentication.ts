import { TokenType } from '@/enums/TokenType';
import { AccessToken } from '@/models/AccessToken';
import { IAuthLogin } from '@/schema';
import { POST } from '@Core';

import { SignUpExhibitionParam } from '../models/AccessToken';
import {
  AuthInformation,
  ILoginEmailParam,
  ISendCodeForm,
  SendCodeSuccess,
  VerifyOTPParam,
} from '@/schema/Wonderpass/Authentication';

export function login(param: IAuthLogin): Promise<AccessToken> {
  const API_URL = '/api/oauth2/v1/login';
  return POST<AccessToken, IAuthLogin>(API_URL, param);
}

export function emailIsValid(param: { email: string }): Promise<{ isValid: boolean }> {
  const API_URL = '/api/oauth2/v1/email/valid';
  return POST<{ isValid: boolean }, { email: string }>(API_URL, param);
}

export function signUpWithExhibition(param: SignUpExhibitionParam, token: string) {
  const API_URL = '/api/oauth2/v1/exhibition/sign-up';
  const headers = {
    Authorization: [TokenType.Bearer, token].join(' '),
  };
  return POST<AccessToken, SignUpExhibitionParam>(API_URL, param, headers);
}

export function loginEmailByWonderPass(param: ILoginEmailParam): Promise<AuthInformation> {
  const API_URL = '/wonderpass-api/v1/auth/users/email';
  return POST<AuthInformation, ILoginEmailParam>(API_URL, param);
}

export const sendCodeToPhoneNumber = (param: ISendCodeForm): Promise<SendCodeSuccess> => {
  const API_URL = '/wonderpass-api/v1/auth/users/phone';
  return POST<SendCodeSuccess, ISendCodeForm>(API_URL, param);
};

export const verifyUserWithOTP = (param: VerifyOTPParam): Promise<AuthInformation> => {
  const API_URL = '/wonderpass-api/v1/auth/users/verify';
  return POST<AuthInformation, VerifyOTPParam>(API_URL, param);
};
