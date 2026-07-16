"use client";

import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  Home,
  ShieldAlert,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-110">
      <div className="relative overflow-hidden">
        <img
          src="/padel-racket.png"
          alt="Court"
          className="h-80 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute left-8 top-20 z-10">
          <div className="p-1.5 rounded-full bg-red-950 w-fit mb-4">
            <div className="p-1 rounded-full bg- w-fit border border-red-700">
              <X
                size={44}
                className="text-red-500 bg-black p-1 rounded-full border border-red-500"
              />
            </div>
          </div>

          <p className="text-red-500 text-sm font-medium">Payment Failed</p>

          <h1 className="mt-2 text-3xl font-bold leading-10 text-white">
            Your payment was
            <br />
            <span className="text-lime-300">not complete</span>
          </h1>

          <div className="text-sm my-3 text-zinc-400">
            <p>No amount has been charged.</p>
            <p>You can try again anytime.</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
      </div>

      <Card className="max-w-90 mt-4 mx-auto rounded-lg bg-zinc-800/50 p-4 border border-red-700/50">
        <div className="flex gap-2">
          <CircleAlert className="text-red-500" />
          <div>
            <span className="text-zinc-300 font-bold">
              The payment cancelled or could not be processed.
            </span>
            <p className="text-xs font-semibold mt-1 text-zinc-400 tracking-widest">
              Please book again
            </p>
          </div>
        </div>
      </Card>

      <Card className="max-w-90 mt-4 mx-auto rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
        <div className="flex gap-2">
          <ShieldAlert className="text-red-500 w-15 h-5" />
          <div>
            <span className="text-zinc-300 font-bold">What happened?</span>
            <p className="text-xs font-semibold mt-1 text-zinc-400 ">
              Your payment was not completed. This can happen if the payment was
              canceled, the connection was interrupted or the transaction
              failed.
            </p>
          </div>
        </div>
      </Card>

      <div className="max-w-90 mx-auto mt-6 space-y-2">
        <Button
          onClick={() => router.push("/my-bookings")}
          className="flex items-center  justify-between p-4 w-full bg-zinc-800/50 border-zinc-700/50 text-zinc-200 font-semibold py-6 hover:bg-lime-300 hover:text-black"
        >
          <div className="flex items-center gap-2">
            <CalendarDays />
            <span>My Bookings</span>
          </div>
          <span>
            <ArrowRight />
          </span>
        </Button>

        <Button
          onClick={() => router.push("/")}
          className="flex items-center  justify-between p-4 w-full bg-zinc-800/50 border-zinc-700/50 text-zinc-200 font-semibold py-6 hover:bg-lime-300 hover:text-black"
        >
          <div className="flex items-center gap-2">
            <Home />
            <span>Back to Home</span>
          </div>
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Page;
