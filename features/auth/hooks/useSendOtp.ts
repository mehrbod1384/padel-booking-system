"use client";

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../api/authApi";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export function useSendOtp() {
  const { mutate: sendOtpMutation, isPending: isSending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      // Demo build: the API returns the OTP so it can be surfaced to the user.
      toast(`OTP code: ${data}`, { duration: 60000, icon: "🔐" });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Could not send the code")),
  });

  return { sendOtpMutation, isSending };
}
