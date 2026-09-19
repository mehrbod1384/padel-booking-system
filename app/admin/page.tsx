import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Redirect() {
  const user = await getUserFromToken();

  if (user) redirect("/admin/dashboard");
  else redirect("/login");
}

export default Redirect;
