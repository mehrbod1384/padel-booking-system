import {
  checkExistingPayment,
  createPayment,
} from "@/features/payment/services/paymentService";
import { routeHandler } from "@/lib/routeHandler";
import { createPaymentSchema } from "@/lib/validation";
import { AppError } from "@/lib/errors/AppError";
import { NextResponse } from "next/server";

export const POST = routeHandler(
  async (_req, { body }) => {
    const { reservationId } = body as { reservationId: string };

    const existingPayment = await checkExistingPayment(reservationId);

    if (existingPayment) {
      return NextResponse.json({
        paymentUrl: `https://sandbox.zarinpal.com/pg/StartPay/${existingPayment.authority}`,
      });
    }

    const result = await createPayment(reservationId);

    if (!result) throw new AppError("Payment could not be initiated", 502);

    const { payment, paymentGeteway } = result;

    return NextResponse.json({
      paymentId: payment._id,
      paymentUrl: paymentGeteway.paymentUrl,
    });
  },
  { schema: createPaymentSchema, auth: true },
);
