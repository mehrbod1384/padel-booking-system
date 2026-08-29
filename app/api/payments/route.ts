import {
  checkExistingPayment,
  createPayment,
} from "@/features/payment/services/paymentService";
import { routeHandler } from "@/lib/routeHandler";
import { createPaymentSchema } from "@/lib/validation";
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

    const { payment, paymentGeteway }: any = await createPayment(reservationId);

    return NextResponse.json({
      paymentId: payment._id,
      paymentUrl: paymentGeteway.paymentUrl,
    });
  },
  { schema: createPaymentSchema, auth: true },
);
