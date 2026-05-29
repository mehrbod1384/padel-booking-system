import { connectDB } from "@/lib/db";
import { Reservation } from "@/models/Reservation";
import { slots } from "@/features/booking/utils/slots";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!courtId || !date) {
      return Response.json(
        {
          success: false,
          message: "courtId and date required",
        },
        {
          status: 400,
        },
      );
    }
    const reservationDate = new Date(date);
    reservationDate.setHours(0, 0, 0, 0);

    const reservations = await Reservation.find({
      court: courtId,
      date: reservationDate,
      status: {
        $in: ["PENDING", "CONFIRMED"],
      },
    });

    const reservedSlots = reservations.map((reservation) => reservation.slot);

    const availableSlots = slots.filter(
      (slot) => !reservedSlots.includes(slot),
    );

    return Response.json({
      success: true,
      availableSlots,
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
