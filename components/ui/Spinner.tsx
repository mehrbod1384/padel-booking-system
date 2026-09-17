"use client";

import { ClipLoader, FadeLoader } from "react-spinners";

/**
 * Single source of truth for the brand accent used by react-spinners.
 * Matches `--color-brand` (lime-300) declared in app/globals.css.
 */
export const BRAND_COLOR = "#bef264";

export function Spinner({ size = 16 }: { size?: number }) {
  return <ClipLoader size={size} color={BRAND_COLOR} />;
}

export function PageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={
        className ?? "flex min-h-80 w-full items-center justify-center"
      }
    >
      <FadeLoader color={BRAND_COLOR} />
    </div>
  );
}
