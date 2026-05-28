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

    const otp = generateOtp();

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await OtpCode.create({
      phone,
      code: otp,
      expiresAt,
    });

    console.log("OTP:", otp);

    return Response.json({
      success: true,
      message: "OTP sent successfuly",
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
