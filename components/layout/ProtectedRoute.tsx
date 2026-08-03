import { useUser } from "@/features/auth/hooks/useUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { FadeLoader } from "react-spinners";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FadeLoader color="#bbf451" />
      </div>
    );

  if (!user) {
    redirect("/auth/login");
  }

  return children;
}

export default ProtectedRoute;
