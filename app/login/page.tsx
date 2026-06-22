"use client";

import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  async function sendOtp() {
    const res = await axios.post("/api/auth/send-otp", { phone });

    const data = await res.data;

    if (data.success) {
      setStep("otp");
    }

    console.log(data);
  }

  async function verifyOtp() {
    const res = await axios.post("/api/auth/verify-otp", { phone, code });

    const data = await res.data;

    console.log(data);

    if (data.success) {
      window.location.href = "/";
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      {step === "phone" && (
        <div>
          <input
            placeholder="Phone"
            value={phone}
            className="border border-white"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="bg-white text-black" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div>
          <input
            placeholder="OTP Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button onClick={verifyOtp}>Verify</button>
        </div>
      )}
    </div>
  );
}
