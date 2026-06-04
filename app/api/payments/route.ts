import {
  checkExistingPayment,
  createPayment,
} from "@/features/payment/services/paymentService";
import { handleApiError } from "@/lib/errors/handleApiError";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId } = body;

    const existingPayment = await checkExistingPayment(reservationId);

    if (existingPayment) {
      return NextResponse.json({
        paymentUrl: `https://sandbox.zarinpal.com/pg/StartPay/${existingPayment.authority}`,
      });
    }

    const { payment, paymentGeteway }: any = await createPayment(reservationId);

    return NextResponse.json({
      paymentId: payment._id,
      paymentUrl: paymentGeteway.paymentUrl,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
