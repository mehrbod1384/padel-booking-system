import { generateToken } from "@/features/auth/utils/generateToken";
import { connectDB } from "@/lib/db";
import { OtpCode } from "@/models/OtpCode";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { phone, code } = body;

    if (!phone || !code) {
      return Response.json(
        {
          success: false,
          message: "Phone and code are required",
        },
        {
          status: 400,
        },
      );
    }

    const otpDoc = await OtpCode.findOne({
      phone,
      code,
    });

    if (!otpDoc) {
      return Response.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 400,
        },
      );
    }

    if (otpDoc.expiresAt < new Date()) {
      return Response.json(
        {
          success: false,
          message: "OTP expired",
        },
        {
          status: 400,
        },
      );
    }

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

    return Response.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log(err);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
