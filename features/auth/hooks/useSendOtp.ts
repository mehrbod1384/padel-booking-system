"use client";

import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../api/authApi";

export function useSendOtp() {
  const { mutate: sendOtpMutation, isPending: isSending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.error(error),
  });

  return { sendOtpMutation, isSending };
}
