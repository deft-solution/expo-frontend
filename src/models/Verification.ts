export interface ISendVerificationParam {
  email: string;
}

export interface IVerifyParam {
  email: string;
  code: string;
}

export interface ISendVerificationResponse {
  email: string;
  token: string;
}

export interface SendVerificationResponse {
  createdAt: string;
  recipient: string;
  verificationCode: string;
  type: number;
  expiresAt: string;
  updatedAt: string;
  id: string;
}