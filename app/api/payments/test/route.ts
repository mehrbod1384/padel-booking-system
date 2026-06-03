import { createPaymentRequest } from "@/features/payment/services/zarinpalService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await createPaymentRequest(body);

    const paymentUrl = `https://sandbox.zarinpal.com/pg/StartPay/${data.authority}`;
    console.log(paymentUrl);

    return NextResponse.json({
      data,
    });
  } catch (err) {
    return NextResponse.json({
      err,
    });
  }
}
