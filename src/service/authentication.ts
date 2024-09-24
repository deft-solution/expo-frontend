import { TokenType } from '@/enums/TokenType';
import { AccessToken } from '@/models/AccessToken';
import { IAuthLogin } from '@/schema';
import { POST } from '@Core';

import { SignUpExhibitionParam } from '../models/AccessToken';

export function login(param: IAuthLogin): Promise<AccessToken> {
  const API_URL = `/api/oauth2/v1/login`;
  return POST<AccessToken, IAuthLogin>(API_URL, param);
}

export function emailIsValid(param: { email: string }): Promise<{ isValid: boolean }> {
  const API_URL = `/api/oauth2/v1/email/valid`;
  return POST<{ isValid: boolean }, { email: string }>(API_URL, param);
}

export function signUpWithExhibition(param: SignUpExhibitionParam, token: string) {
  const API_URL = `/api/oauth2/v1/exhibition/sign-up`;
  const headers = {
    'Authorization': [TokenType.Bearer, token].join(' ')
  }
  return POST<any, SignUpExhibitionParam>(API_URL, param, headers);
}