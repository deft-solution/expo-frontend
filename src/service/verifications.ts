import {
    ISendVerificationParam, ISendVerificationResponse, IVerifyParam, SendVerificationResponse
} from '@/models/Verification';
import { POST } from '@Core';

export class VerificationService {
  private static readonly API_URL = '/api/verifications/';

  static sendVerification(param: ISendVerificationParam): Promise<SendVerificationResponse> {
    const url = this.API_URL + '/v1/send';
    return POST<SendVerificationResponse, ISendVerificationParam>(url, param);
  }

  static verifyUserCode(param: IVerifyParam): Promise<ISendVerificationResponse> {
    const url = this.API_URL + '/v1/verify';
    return POST<ISendVerificationResponse, IVerifyParam>(url, param);
  }
}