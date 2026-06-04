import { verifyPayment } from "@/features/payment/services/zarinpalService";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";
import { Payment } from "@/models/Payment";
import { Reservation } from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (!authority) {
      return NextResponse.redirect(
        new URL("/payment/result?status=failed", req.url),
      );
    }

    const payment = await Payment.findOne({
      authority,
    });

    if (!payment) {
      return NextResponse.redirect(
        new URL("/payment/result?status=failed", req.url),
      );
    }

    if (payment.status === "SUCCESS") {
      return NextResponse.redirect(
        new URL(`/payment/result?paymentId=${payment._id}`, req.url),
      );
    }

    if (status !== "OK") {
      payment.status = "FAILED";
      await payment.save();

      return NextResponse.redirect(
        new URL("/payment/result?status=failed", req.url),
      );
    }

    const verifyResult = await verifyPayment(payment.amount, authority);

    if (verifyResult.code !== 100) {
      return NextResponse.redirect(
        new URL("/payment/result?status=failed", req.url),
      );
    }

    const reservation = await Reservation.findById(payment.reservation);

    if (reservation.status !== "PENDING") {
      payment.status = "FAILED";
      await payment.save();

      return NextResponse.redirect(
        new URL("/payment/result?status=failed", req.url),
      );
    }

    payment.status = "SUCCESS";
    payment.refId = verifyResult.ref_id.toString();

    reservation.status = "CONFIRMED";

    await payment.save();
    await reservation.save();

    return NextResponse.redirect(
      new URL(`/payment/result?paymentId=${payment._id}`, req.url),
    );
  } catch (err) {
    console.log(err.response?.data || err.message);

    return handleApiError(err);
  }
}
