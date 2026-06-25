import { Input } from "@/components/ui/input";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useSendOtp } from "../hooks/useSendOtp";
import { ClipLoader } from "react-spinners";

export default function SendOtpForm({ setPhone, setStep }: any) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendOtpMutation, isSending } = useSendOtp();

  function onSubmit(data: any) {
    // console.log(data);

    sendOtpMutation(data, {
      onSuccess: () => {
        setPhone(data.phone);
        setStep("otp");
        reset();
      },
    });
  }

  return (
    <Card className="rounded-lg max-w-90 mx-auto p-4 border-zinc-700 bg-zinc-800/50">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="ml-1 text-zinc-400 font-semibold">Phone number</label>
        <div>
          <Input
            {...register("phone", {
              required: "Phone number required",
              maxLength: 11,
              minLength: 11,
            })}
            type="text"
            placeholder="912 345 6789"
            className="h-12 rounded-xl border-zinc-700 text-white focus-visible:ring-1 focus-visible:border-lime-300 focus-visible:ring-lime-300"
          />
          {errors.phone && (
            <p className="ml-1 mt-1 text-red-500">
              {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <ShieldCheck className="text-lime-300" />
          <p className="text-xs text-zinc-400 w-40">
            We'll send you a 6-digit code to verify your number
          </p>
        </div>

        <Button
          disabled={isSending}
          type="submit"
          className="mt-4 flex items-center justify-between p-4 py-6 text-black bg-lime-300 hover:bg-lime-400"
        >
          <span></span>
          <span>Send verification code</span>
          <span className="bg-lime-200/50 p-2 rounded-full flex items-center justify-center">
            {isSending ? <ClipLoader size={16} /> : <ArrowRight />}
          </span>
        </Button>
      </form>
    </Card>
  );
}
