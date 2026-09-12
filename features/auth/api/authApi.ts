import { axiosInstance } from "@/lib/axiosInstance";

import type {
  SendOtpPayload,
  User,
  VerifyOtpPayload,
} from "../types";

export async function getProfile(): Promise<User | null> {
  const res = await axiosInstance.get("/auth/me");

  return res.data.data;
}

export async function sendOtp(payload: SendOtpPayload): Promise<string> {
  const res = await axiosInstance.post("/auth/send-otp", payload);

  return res.data.data;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<User> {
  const res = await axiosInstance.post("/auth/verify-otp", payload);

  return res.data.data;
}

export async function logout(): Promise<{ success: boolean }> {
  const res = await axiosInstance.post("/auth/logout");

  return res.data;
}
