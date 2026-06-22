import { axiosInstance } from "@/lib/axiosInstance";

export async function getPayment(paymentId: string) {
  const res = await axiosInstance.get(`/payments/${paymentId}`);

  return res.data.data;
}

export async function getReservationDetails(reservationId: string) {
  const res = await axiosInstance.get(`/reservations/${reservationId}`);

  return res.data.data;
}
