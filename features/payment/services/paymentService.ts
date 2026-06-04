import { Payment } from "@/models/Payment";
import { createPaymentRequest } from "./zarinpalService";
import { AppError } from "@/lib/errors/AppError";
import { Reservation } from "@/models/Reservation";

export async function checkExistingPayment(reservationId: string) {
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) throw new AppError("Reservation not found", 404);

  if (reservation.status === "CONFIRMED")
    throw new AppError("Reservation already paid", 400);

  const existingPayment = await Payment.findOne({
    reservation: reservation._id,
    status: "INITIATED",
  });

  return existingPayment;
}

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
