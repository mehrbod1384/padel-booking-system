import { axiosInstance } from "@/lib/axiosInstance";

import type { ReservationDetail } from "@/features/booking/types";

import type { Payment } from "../types";

export async function getPayment(paymentId: string): Promise<Payment> {
  const res = await axiosInstance.get(`/payments/${paymentId}`);

  return res.data.data;
}

export async function getReservationDetails(
  reservationId: string,
): Promise<ReservationDetail> {
  const res = await axiosInstance.get(`/reservations/${reservationId}`);

  return res.data.data;
}
