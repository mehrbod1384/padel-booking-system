import { axiosInstance } from "@/lib/axiosInstance";

export async function getAllCourtsApi() {
  const res = await axiosInstance.get("/courts");

  return res.data.courts;
}

export async function createCourtApi(payload: { name: string; price: number }) {
  const res = await axiosInstance.post("/admin/courts", payload);

  return res.data.court;
}

export async function updateCourtApi(courtId: string) {
  const res = await axiosInstance.patch(`/admin/courts/${courtId}`);

  return res.data.court;
}

export async function deleteCourtApi(courtId: string) {
  const res = await axiosInstance.delete(`/admin/courts/${courtId}`);

  return res.data;
}
