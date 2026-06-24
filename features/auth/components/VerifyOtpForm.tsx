"use client";

import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function VerifyOtpForm({
  phone,
  setStep,
}: {
  phone: string;
  setStep: any;
}) {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({ code: "" });

  const { verifyOtpMutation, isVerifying } = useVerifyOtp();

  useEffect(() => {
    console.log("hey");
    if (code.length === 6) {
      verifyOtpMutation(
        { phone, code },
        {
          onSuccess: () => {
            setStep("phone");
          },
        },
      );
    }
  }, [code]);

  function onSubmit(e) {
    e.preventDefault();

    if (code.length === 0) {
      setErrors({ code: "Code is required" });
      return;
    }

    if (code.length < 6) {
      setErrors({ code: "Enter the entire code" });
      return;
    }

    verifyOtpMutation(
      { phone, code },
      {
        onSuccess: () => {
          setStep("phone");
        },
      },
    );
  }

  console.log(code);

  return (
    <Card className="rounded-lg max-w-90 mx-auto p-4 border-zinc-700 bg-zinc-800/50">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="ml-1 text-zinc-400 font-semibold">
          Enter 6-digit code
        </label>

        <div>
          <div className="flex items-center justify-center">
            <InputOTP
              onChange={setCode}
              value={code}
              maxLength={6}
              containerClassName="space-x-3 text-lime-300"
            >
              <InputOTPSlot
                index={0}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900"
              />
              <InputOTPSlot
                index={1}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900"
              />
              <InputOTPSlot
                index={2}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900"
              />
              <InputOTPSlot
                index={3}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900"
              />
              <InputOTPSlot
                index={4}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900"
              />
              <InputOTPSlot
                index={5}
                className=" h-10 w-10 rounded-xl border border-zinc-700 data-[active=true]:ring-0 data-[active=true]:text-lime-300 data-[active=true]:border-lime-300 bg-zinc-900 m-0"
              />
            </InputOTP>
          </div>
          {errors.code && (
            <p className="ml-4 mt-1 text-red-500">{errors.code}</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <ShieldCheck className="text-lime-300" />
          <p className="text-xs text-zinc-400 w-45">
            This code will expire in 5 minutes for your security
          </p>
        </div>

        <Button
          disabled={isVerifying}
          type="submit"
          className="mt-4 flex items-center justify-between p-4 py-6 text-black bg-lime-300 hover:bg-lime-400"
        >
          <span></span>
          <span>Verify and continue</span>
          <span className="bg-lime-200/50 p-2 rounded-full">
            {isVerifying ? <ClipLoader size={16} /> : <ArrowRight />}
          </span>
        </Button>
      </form>
    </Card>
  );
}
