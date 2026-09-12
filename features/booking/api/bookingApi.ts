import { axiosInstance } from "@/lib/axiosInstance";

import type {
  AdminReservation,
  CreateReservationPayload,
  MyBookingsResponse,
  Reservation,
  Slot,
} from "../types";

export async function getConfirmedReservation(): Promise<AdminReservation[]> {
  const res = await axiosInstance.get("/admin/reservations");

  return res.data.data;
}

export async function getAvalableSlots(
  courtId: string | undefined,
  date: string | undefined,
): Promise<Slot[]> {
  const res = await axiosInstance.get(
    `/availability/?courtId=${courtId}&date=${date}`,
  );

  return res.data.data;
}

export async function bookReservation(
  payLoad: CreateReservationPayload,
): Promise<Reservation> {
  const res = await axiosInstance.post("/reservations", payLoad);

  return res.data.data;
}

export async function getMyBookings(): Promise<MyBookingsResponse> {
  const res = await axiosInstance.get("/reservations/my");

  return res.data.data;
}
