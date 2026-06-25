import { OtpCode } from "@/models/OtpCode";
import { generateOtp } from "../utils/generateOtp";
import { User } from "@/models/User";
import { generateToken } from "../utils/generateToken";
import { cookies } from "next/headers";
import { AppError } from "@/lib/errors/AppError";

export async function sendOtp(phone: string) {
  if (!phone) throw new AppError("Phone is required", 400);

  const otp = generateOtp();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OtpCode.create({
    phone,
    code: otp,
    expiresAt,
  });

  return otp;
}

export async function verifyOtp(phone: string, code: string) {
  if (!phone || !code) throw new AppError("Phone and code are required", 400);

  const otpDoc = await OtpCode.findOne({
    phone,
    code,
  });

  if (!otpDoc) throw new AppError("Invalid OTP", 400);

  if (otpDoc.expiresAt < new Date()) throw new AppError("OTP expired", 400);

  let user = await User.findOne({ phone });

  if (!user) user = await User.create({ phone });

  const token = generateToken(user._id.toString());

  await OtpCode.deleteMany({ phone });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return user;
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
