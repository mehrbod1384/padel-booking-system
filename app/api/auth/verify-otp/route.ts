import { verifyOtp } from "@/features/auth/authService";
import { connectDB } from "@/lib/db";
import { OtpCode } from "@/models/OtpCode";

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

    const user = await verifyOtp(phone);

    return Response.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Server error",
        err,
      },
      {
        status: 500,
      },
    );
  }
}
