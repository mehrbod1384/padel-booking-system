import { routeHandler } from "@/lib/routeHandler";
import { Reservation } from "@/models/Reservation";
import { NextResponse } from "next/server";

export const GET = routeHandler(async () => {
  const reservations = await Reservation.find()
    .populate("user", "phone -_id")
    .populate("court", "name price isActive")
    .select("-expiresAt -updatedAt")
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: reservations,
  });
}, { auth: true });
