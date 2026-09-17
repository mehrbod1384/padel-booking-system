"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyOtp } from "../api/authApi";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";
import { useRouter } from "next/navigation";

export function useVerifyOtp() {
  const router = useRouter();

  const { mutate: verifyOtpMutation, isPending: isVerifying } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.remove();
      router.push("/");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Invalid or expired code")),
  });

  return { verifyOtpMutation, isVerifying };
}
