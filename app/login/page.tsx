"use client";

import PageHero from "@/components/layout/PageHero";
import SendOtpForm from "@/features/auth/components/SendOtpForm";
import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";

import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="container mx-auto max-w-110">
      <PageHero
        image="/padel-racket.png"
        imageAlt="Padel court"
        eyebrow={step === "phone" ? "WELCOME BACK" : "VERIFY YOUR NUMBER"}
        titleLead={step === "phone" ? "Log in to your" : "Enter the code we"}
        titleAccent={step === "phone" ? "account" : "sent you"}
        description={
          step === "phone"
            ? "Enter your phone number to receive a verification code"
            : `We've sent a 6-digit verification code to ${phone}`
        }
        descriptionClassName="w-60"
        contentClassName="top-auto bottom-8 left-8"
      />

      {step === "phone" ? (
        <SendOtpForm setPhone={setPhone} setStep={setStep} />
      ) : (
        <VerifyOtpForm phone={phone} setStep={setStep} />
      )}
    </div>
  );
}
