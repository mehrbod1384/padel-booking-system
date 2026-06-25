import { axiosInstance } from "@/lib/axiosInstance";

export async function sendOtp(payload: { phone: string }) {
  const res = await axiosInstance.post("/auth/send-otp", payload);

  return res.data.data;
}

export async function verifyOtp(payload: { phone: string; code: string }) {
  const res = await axiosInstance.post("/auth/verify-otp", payload);

  return res.data.data;
}

export async function logout() {
  const res = await axiosInstance.post("/auth/logout");

  return res.data;
}
