import { cn } from "@/lib/utils";

export default function TimeButtons({
  time,
  setTime,
}: {
  time: string;
  setTime: any;
}) {
  return (
    <div className="mx-auto flex items-center justify-between gap-3 p-1.5 max-w-90 rounded-lg border border-zinc-800 bg-zinc-800/50">
      <button
        onClick={() => setTime("upcoming")}
        className={cn(
          "w-full text-sm py-1.5 font-bold hover:bg-lime-300 hover:text-black rounded-xl text-zinc-400",
          time === "upcoming" && "bg-lime-300 text-black",
        )}
      >
        Upcoming
      </button>
      <button
        onClick={() => setTime("past")}
        className={cn(
          "w-full text-sm py-1.5 font-bold hover:bg-lime-300 rounded-xl hover:text-black text-zinc-400",
          time === "past" && "bg-lime-300 text-black",
        )}
      >
        Past
      </button>
    </div>
  );
}
