import { axiosInstance } from "@/lib/axiosInstance";

export async function getConfirmedReservation() {
  const res = await axiosInstance.get("/admin/reservations");

  return res.data.data;
}

export async function getAvalableSlots(courtId: string, date: string) {
  const res = await axiosInstance.get(
    `/availability/?courtId=${courtId}&date=${date}`,
  );

  return res.data.data;
}

export async function bookReservation(payLoad: {
  courtId: string;
  date: string;
  slot: string;
}) {
  const res = await axiosInstance.post("/reservations", payLoad);

  return res.data.data;
}
