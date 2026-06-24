"use client";

import SendOtpForm from "@/features/auth/components/SendOtpForm";
import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";

import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="relative overflow-hidden">
        <img
          src="/padel-racket.png"
          alt="Court"
          className="h-80 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-8 left-8 z-10">
          <p className="text-lime-300 text-sm font-medium">
            {step === "phone" ? "WELCOME BACK" : "VERIFY YOUR NUMBER"}
          </p>

          <h1 className="mt-2 text-4xl font-bold leading-none text-white">
            {step === "phone" ? "Log in to your" : "Enter the code we sent"}
            <br />
            <span className="text-lime-300">
              {step === "phone" ? "acount" : "you"}
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 w-60">
            {step === "phone"
              ? "Enter your phone number to recive a verification code"
              : `We've sent a 6-digit verification code to ${phone}`}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
      </div>
      {/* <Card className="rounded-lg max-w-90 mx-auto p-4 border-zinc-700 bg-zinc-800/50">
        <form className="flex flex-col gap-4">
          <label className="ml-1 text-zinc-400 font-semibold">
            Enter 6-digit code
          </label>

          <div className="flex items-center justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
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

          <div className="flex items-center gap-2 mt-2">
            <ShieldCheck className="text-lime-300" />
            <p className="text-xs text-zinc-400 w-45">
              This code will expire in 5 minutes for your security
            </p>
          </div>

          <Button className="mt-4 flex items-center justify-between p-4 py-6 text-black bg-lime-300 hover:bg-lime-400">
            <span></span>
            <span>Send verification code</span>
            <span className="bg-lime-200/50 p-2 rounded-full">
              <ArrowRight />
            </span>
          </Button>
        </form>
      </Card> */}

      {step === "phone" ? (
        <SendOtpForm setPhone={setPhone} setStep={setStep} />
      ) : (
        <VerifyOtpForm phone={phone} setStep={setStep} />
      )}
    </div>
  );
}
