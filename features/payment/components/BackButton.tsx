import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Card className="max-w-90 mt-4 mx-auto rounded-lg bg-zinc-800/50 p-1 border border-zinc-700/50">
      <Button
        onClick={() => router.push("/my-bookings")}
        className="flex items-center justify-between p-4 w-full bg-lime-300 text-black font-semibold py-6 hover:bg-lime-400"
      >
        <span></span>
        <span>View My Bookings</span>
        <span>
          <ArrowRight />
        </span>
      </Button>
    </Card>
  );
}
