"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const paymentId = useSearchParams().get("paymentId");
  const [refId, setRefId] = useState<string>("");

  useEffect(() => {
    async function getRefId() {
      const res = await axios.get(`/api/payments/${paymentId}`);

      console.log(res.data);

      setRefId(res.data.refId);
    }

    getRefId();
  }, [paymentId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-9xl">پرداخت موفق</h1>
        <h2>{refId}کد پیگیری</h2>
      </div>
    </div>
  );
}
