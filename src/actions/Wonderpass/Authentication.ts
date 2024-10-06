import { AUTH_WONDERPASS } from '@/constants/Storage';
import {
  ILoginEmailParam,
  ISendCodeForm,
  VerifyOTPParam,
} from '@/schema/Wonderpass/Authentication';
import { loginEmailByWonderPass, verifyUserWithOTP } from '@/service/authentication';

export const handleLoginEmailByWonderPass = (param: ILoginEmailParam) => {
  return loginEmailByWonderPass(param)
    .then((response) => {
      const token = response.data.value?.token;
      if (token) {
        localStorage.setItem(AUTH_WONDERPASS, JSON.stringify(response));
      }
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

export const verifiyOTP = (param: VerifyOTPParam) => {
  return verifyUserWithOTP(param)
    .then((response) => {
      const token = response.data.value?.token;
      if (token) {
        localStorage.setItem(AUTH_WONDERPASS, JSON.stringify(response));
      }
      return response;
    })
    .catch((err) => {
      throw err;
    });
};
