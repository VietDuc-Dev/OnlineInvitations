export type forgotPasswordType = { email: string };
export type resetPasswordType = { password: string; verificationCode: string };

export type LoginType = {
  email: string;
  password: string;
};

export type registerType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type verifyEmailType = { code: string };
export type verifyMFAType = { code: string; secretKey: string };
export type mfaLoginType = { code: string; email: string };

export type SessionType = {
  _id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

export type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

export type mfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};
