import { AccessToken } from '@/models/AccessToken';
import { IAuthLogin } from '@/schema';
import { POST } from '@Core';

export function login(param: IAuthLogin): Promise<AccessToken> {
  const API_URL = `/api/oauth2/v1/login`;
  return POST<AccessToken, IAuthLogin>(API_URL, param);
}