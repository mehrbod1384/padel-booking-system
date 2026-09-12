import { axiosInstance } from "@/lib/axiosInstance";

import type { Court, CreateCourtPayload, UpdateCourtPayload } from "../types";

export async function getAllCourtsApi(): Promise<Court[]> {
  const res = await axiosInstance.get("/courts");

  return res.data.data;
}

export async function createCourtApi(
  payload: CreateCourtPayload,
): Promise<Court> {
  const res = await axiosInstance.post("/admin/courts", payload);

  return res.data.court;
}

export async function updateCourtApi(
  payload: UpdateCourtPayload,
): Promise<Court> {
  const res = await axiosInstance.patch(
    `/admin/courts/${payload.courtId}`,
    payload,
  );

  return res.data.court;
}

export async function deleteCourtApi(
  courtId: string,
): Promise<{ success: boolean }> {
  const res = await axiosInstance.delete(`/admin/courts/${courtId}`);

  return res.data;
}
