import { Payment } from "@/models/Payment";
import { createPaymentRequest } from "./zarinpalService";

export async function createPayment(reservation: any) {
  const paymentGeteway = await createPaymentRequest({
    amount: reservation.amount,
    description: `Reservation ${reservation._id}`,
    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/verify`,
  });

  if (paymentGeteway.code !== 100) return;

  const payment = await Payment.create({
    reservation: reservation._id,
    amount: reservation.amount,
    authority: paymentGeteway.authority,
    status: "INITIATED",
  });

  return { paymentGeteway, payment };
}
