import { Court } from "@/models/Court";

export async function getAllCourt() {
  return await Court.find();
}

export async function createCourt(name: string, price: number) {
  const court = await Court.create({
    name,
    price,
  });

  return court;
}

export async function updateCourt(
  courtId: string,
  payload: { name: string; price: number; isActive: boolean },
) {
  return await Court.findByIdAndUpdate(courtId, payload, { new: true });
}

export async function deleteCourt(courtId: string) {
  await Court.findByIdAndDelete(courtId);
}
