import { OtpCode } from "@/models/OtpCode";
import { generateOtp } from "./utils/generateOtp";
import { User } from "@/models/User";
import { generateToken } from "./utils/generateToken";
import { cookies } from "next/headers";

export async function sendOtp(phone: string) {
  const otp = generateOtp();

  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await OtpCode.create({
    phone,
    code: otp,
    expiresAt,
  });

  console.log("OTP:", otp);
}

export async function verifyOtp(phone: string) {
  let user = await User.findOne({ phone });

  if (!user) user = await User.create({ phone });

  const token = generateToken(user._id.toString());

  await OtpCode.deleteMany({ phone });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return user;
}
