"use client";

import { useEffect } from "react";

import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="rounded-xl border-red-400/30 bg-zinc-800/50">
      <CardContent className="flex flex-col items-start gap-3 p-6">
        <span className="flex size-12 items-center justify-center rounded-full border border-red-400/40 bg-red-400/10 text-red-400">
          <TriangleAlert size={22} />
        </span>

        <h2 className="text-lg font-bold text-white">Something went wrong</h2>

        <p className="text-sm text-zinc-400">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        <Button variant="brand" onClick={() => unstable_retry()}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}