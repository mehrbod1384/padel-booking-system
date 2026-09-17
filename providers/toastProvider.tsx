import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

/**
 * App-wide toast host. Previously a <Toaster /> was mounted only inside the
 * login page, so no other surface (e.g. the admin panel) could show toasts.
 */
export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#18181b",
            color: "#d4d4d8",
            border: "1px solid #bef264",
          },
        }}
      />
    </>
  );
}
