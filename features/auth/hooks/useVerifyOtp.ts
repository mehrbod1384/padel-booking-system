"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../api/authApi";
import { useRouter } from "next/navigation";

export function useVerifyOtp() {
  const router = useRouter();

  const { mutate: verifyOtpMutation, isPending: isVerifying } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log(data);
      router.push("/");
    },
    onError: (error) => console.error(error),
  });

  return { verifyOtpMutation, isVerifying };
}
