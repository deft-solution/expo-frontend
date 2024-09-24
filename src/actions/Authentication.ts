import { ERROR_CODE_HAS_SENT, ERROR_USER_DOES_NOT_EXIST } from '@/constants/Authentication';
import { AuthStorageKey } from '@/constants/Storage';
import { AccessToken } from '@/models/AccessToken';
import { IAuthLogin } from '@/schema';
import { login } from '@/service/authentication';
import { VerificationService } from '@/service/verifications';



export const handleSubmitLogin = (param: IAuthLogin): Promise<AccessToken> => {
  return login(param)
    .then((response) => {
      localStorage.setItem(AuthStorageKey, JSON.stringify(response));
      return response;
    }).catch((err) => {
      if (err?.message) {
        alert(err.message);
      }
      throw err;
    });
}

export const hasSendEmailVerificationSuccess = (email: string): Promise<boolean> => {
  return VerificationService.sendVerification({ email }).then(() => {
    return true;
  }).catch((error) => {
    if (error.errorCode === ERROR_USER_DOES_NOT_EXIST) {
      return false;
    }
    if (error.errorCode === ERROR_CODE_HAS_SENT) {
      return true;
    }
    return false;
  })

}