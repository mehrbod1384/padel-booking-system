import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function RefIdCard({ refId }: { refId: string }) {
  return (
    <Card className="max-w-90 mx-auto rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
      <div className="flex items-center gap-2">
        <Bookmark className="text-lime-300" />
        <span className="text-zinc-300 font-bold">Refrence ID</span>
      </div>

      <p className="text-xl text-zinc-300 tracking-widest">{refId}</p>
    </Card>
  );
}
