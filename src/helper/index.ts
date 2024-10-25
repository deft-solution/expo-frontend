import { AUTH_WONDERPASS } from '@/constants/Storage';
import { TokenType } from '@/enums/TokenType';
import { AuthInformation } from '@/schema/Wonderpass/Authentication';
import { getLocalStorageByKey } from '@/utils/LocalStorage';

export const isValidEmailFormat = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
  return emailRegex.test(email);
};

export const getWonderPassToken = () => {
  const auth = getLocalStorageByKey<AuthInformation>(AUTH_WONDERPASS);
  if (auth) {
    const token = auth.data?.value?.token;
    return [TokenType.Bearer, token].join(' ');
  }

  return null;
};
