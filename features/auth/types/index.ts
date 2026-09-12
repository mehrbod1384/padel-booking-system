export type UserRole = "USER" | "ADMIN";

export interface User {
  _id: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type AuthStep = "phone" | "otp";

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
}