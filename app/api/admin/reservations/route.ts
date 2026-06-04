import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { AppError } from "@/lib/errors/AppError";
import { handleApiError } from "@/lib/errors/handleApiError";
import { Reservation } from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    if (!user) throw new AppError("Unauthorized", 401);

    if (user.role !== "ADMIN") throw new AppError("you are not allowed", 401);

    const reservations = await Reservation.find()
      .populate("user", "phone")
      .populate("court", "name price isActive");

    if (!reservations) throw new AppError("Reservations not found", 404);

    return NextResponse.json({
      success: true,
      data: reservations,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
