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
import PageHero from "@/components/layout/PageHero";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-110">
      <PageHero
        image="/padel-racket.png"
        imageAlt="Padel court"
        eyebrow="Payment failed"
        eyebrowClassName="text-red-500"
        titleLead="Your payment was"
        titleAccent="not complete"
        titleSize="sm"
        descriptionClassName="my-3"
        contentClassName="top-20"
        statusIcon={
          <div className="mb-4 w-fit rounded-full bg-red-950 p-1.5">
            <div className="w-fit rounded-full border border-red-700 p-1">
              <X
                size={44}
                className="rounded-full border border-red-500 bg-black p-1 text-red-500"
              />
            </div>
          </div>
        }
        description={
          <>
            <span className="block">No amount has been charged.</span>
            <span className="block">You can try again anytime.</span>
          </>
        }
      />

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
