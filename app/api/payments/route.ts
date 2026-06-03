import { createPayment } from "@/features/payment/services/paymentService";
import { Payment } from "@/models/Payment";
import { Reservation } from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId } = body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return NextResponse.json(
        {
          message: "Reservation not found",
        },
        {
          status: 404,
        },
      );
    }

    if (reservation.status === "CONFIRMED") {
      return NextResponse.json(
        {
          message: "Reservation already paid",
        },
        {
          status: 400,
        },
      );
    }

    const existingPayment = await Payment.findOne({
      reservation: reservation._id,
      status: "INITIATED",
    });

    if (existingPayment) {
      return NextResponse.json({
        paymentUrl: `https://sandbox.zarinpal.com/pg/StartPay/${existingPayment.authority}`,
      });
    }

    const { payment, paymentGeteway }: any = await createPayment(reservation);

    return NextResponse.json({
      paymentId: payment._id,
      paymentUrl: paymentGeteway.paymentUrl,
    });
  } catch (err) {
    return NextResponse.json({
      err,
    });
  }
}
