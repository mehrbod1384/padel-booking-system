import { sendOtp } from "@/features/auth/authService";
import { generateOtp } from "@/features/auth/utils/generateOtp";
import { connectDB } from "@/lib/db";
import { OtpCode } from "@/models/OtpCode";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { phone } = body;

    if (!phone) {
      return Response.json(
        {
          success: false,
          message: "Phone is required",
        },
        {
          status: 400,
        },
      );
    }

    await sendOtp(phone);

    return Response.json({
      success: true,
      message: "OTP sent successfuly",
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
