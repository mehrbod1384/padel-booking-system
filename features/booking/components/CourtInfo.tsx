import { useCourt } from "@/features/court/hooks/useCourt";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

export default function CourtInfo({
  selectedCourt,
  setSelectedCourt,
}: {
  selectedCourt: string;
  setSelectedCourt: any;
}) {
  const { courts, isLoading } = useCourt();

  if (isLoading) return <p>isLoading</p>;

  return (
    <div className="mx-auto flex gap-3 rounded-xl max-w-100 sm:w-auto bg-zinc-800/50 px-3 py-1">
      {courts.map((court: any) => (
        <button
          key={court._id}
          onClick={() => setSelectedCourt(court)}
          className={cn(
            "flex-1 rounded-3xl p-2 transition-all border border-zinc-800/50 text-white duration-300 hover:-translate-y-1 hover:scale-[1.02]  hover:border-lime-300/80",
            selectedCourt === court && "bg-lime-300 text-black",
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700/40",
                selectedCourt === court && "bg-zinc-700/10",
              )}
            >
              <LayoutGrid
                className={cn(
                  "h-4 w-4",
                  selectedCourt === court ? "text-black" : "text-white",
                )}
              />
            </div>
            <div>
              <p className="font-bold text-xs">{court.name}</p>
              <p className="text-xs font-semibold opacity-70 text-gray-500">
                ${court.price}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
