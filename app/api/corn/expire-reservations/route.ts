import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Reservation } from "@/models/Reservation";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  const result = await Reservation.updateMany(
    {
      status: "PENDING",
      expiresAt: {
        $lt: new Date(),
      },
    },
    {
      $set: {
        status: "EXPIRED",
      },
    },
  );

  return NextResponse.json({
    success: true,
    updated: result.modifiedCount,
  });
}
