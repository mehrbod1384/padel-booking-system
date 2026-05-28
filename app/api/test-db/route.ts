import { connectDB } from "@/lib/db";

import { User } from "@/models/User";
import { OtpCode } from "@/models/OtpCode";
import { Court } from "@/models/Court";
import { Reservation } from "@/models/Reservation";
import { Payment } from "@/models/Payment";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "Database connected",
    });
  } catch (err) {
    return Response.json({
      success: false,
      err,
    });
  }
}
