import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();

  const { mutate: logoutMutation, isPending: isLoggingout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
      toast.removeAll();
    },
    onError: () => toast.error("Somthing went please try again"),
  });

  return { logoutMutation, isLoggingout };
}
