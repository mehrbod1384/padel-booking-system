import { OtpCode } from "@/models/OtpCode";
import { generateOtp } from "../utils/generateOtp";
import { User } from "@/models/User";
import { generateToken } from "../utils/generateToken";
import { cookies } from "next/headers";
import { AppError } from "@/lib/errors/AppError";
import { rateLimit } from "@/lib/rateLimit";
import { env } from "@/lib/env";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
const OTP_TTL_MS = 5 * 60 * 1000;

export async function sendOtp(phone: string) {
  if (!phone) throw new AppError("Phone is required", 400);

  const limit = rateLimit(`otp:send:${phone}`, 5, 10 * 60 * 1000);
  if (!limit.success) {
    throw new AppError("Too many OTP requests, try again later", 429);
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await OtpCode.create({
    phone,
    code: otp,
    expiresAt,
    attempts: 0,
  });

  return otp;
}

export async function verifyOtp(phone: string, code: string) {
  if (!phone || !code) throw new AppError("Phone and code are required", 400);

  const otpDoc = await OtpCode.findOne({ phone }).sort({ createdAt: -1 });

  if (!otpDoc) throw new AppError("Invalid OTP", 400);

  if (otpDoc.lockedUntil && otpDoc.lockedUntil > new Date()) {
    throw new AppError(
      "Account temporarily locked, try again later",
      429,
    );
  }

  if (otpDoc.expiresAt < new Date()) {
    await OtpCode.deleteMany({ phone });
    throw new AppError("OTP expired", 400);
  }

  if (otpDoc.code !== code) {
    otpDoc.attempts = (otpDoc.attempts ?? 0) + 1;

    if (otpDoc.attempts >= MAX_ATTEMPTS) {
      otpDoc.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
    }

    await otpDoc.save();
    throw new AppError("Invalid OTP", 400);
  }

  let user = await User.findOne({ phone });

  if (!user) user = await User.create({ phone });

  const token = generateToken(user._id.toString());

  await OtpCode.deleteMany({ phone });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
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
