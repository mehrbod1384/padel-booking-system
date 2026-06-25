"use client";

import { Toaster } from "react-hot-toast";
import SendOtpForm from "@/features/auth/components/SendOtpForm";
import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";

import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="container mx-auto max-w-110">
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

      {step === "phone" ? (
        <SendOtpForm setPhone={setPhone} setStep={setStep} />
      ) : (
        <VerifyOtpForm phone={phone} setStep={setStep} />
      )}

      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 50000,
          removeDelay: 50000,
          style: {
            background: "#18181b",
            color: "#d4d4d8",
            border: "1px solid #bbf451",
          },
        }}
      />
    </div>
  );
}
