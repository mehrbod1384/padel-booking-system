"use client";

import CreateCourtForm from "@/features/court/components/CreateCourtForm";
import { useCourt } from "@/features/court/hooks/useCourt";

export default function CourtsPage() {
  const { courts, isLoading, error } = useCourt();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <CreateCourtForm />

      <div>
        {courts.map((court: any) => (
          <div key={court._id}>
            <p>{court.name}</p>
            <p>{court.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
