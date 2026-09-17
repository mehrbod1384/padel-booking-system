import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

export default function LogOutButton({
  className,
  showLabel = false,
  label = "Sign out",
}: {
  className?: string;
  showLabel?: boolean;
  label?: string;
}) {
  const { logoutMutation, isLoggingout } = useLogout();

  return (
    <Button
      onClick={() => logoutMutation()}
      aria-label={label}
      className={cn(
        "absolute top-8 right-8 cursor-pointer rounded-lg bg-zinc-800/50 p-2 text-brand backdrop-blur-2xl hover:bg-zinc-800/20",
        className,
      )}
    >
      {isLoggingout ? <Spinner size={12} /> : <LogOut />}

      {showLabel && <span>{label}</span>}
    </Button>
  );
}
