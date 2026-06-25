import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { ClipLoader } from "react-spinners";

export default function LogOutButton() {
  const { logoutMutation, isLoggingout } = useLogout();

  return (
    <Button
      onClick={() => logoutMutation()}
      className="text-lime-300 backdrop-blur-2xl p-2 rounded-lg cursor-pointer hover:bg-zinc-800/20 bg-zinc-800/50 absolute top-8 right-8"
    >
      {isLoggingout ? <ClipLoader size={12} color="#bbf451" /> : <LogOut />}
    </Button>
  );
}
