import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The shared hero header. Mirrors the player pages exactly (photo + scrim +
 * bottom fade + lime eyebrow/title) so admin feels like the same product.
 */
export default function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  titleLead,
  titleAccent,
  description,
  descriptionClassName,
  eyebrowClassName,
  height = "lg",
  titleSize = "md",
  statusIcon,
  actions,
  contentClassName,
}: {
  image: string;
  imageAlt?: string;
  eyebrow: string;
  titleLead: ReactNode;
  titleAccent: ReactNode;
  description?: ReactNode;
  descriptionClassName?: string;
  eyebrowClassName?: string;
  height?: "sm" | "lg";
  titleSize?: "sm" | "md" | "lg";
  statusIcon?: ReactNode;
  actions?: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        className={cn(
          "w-full object-cover",
          height === "lg" ? "h-80" : "h-65",
        )}
      />

      <div className="absolute inset-0 bg-black/40" />

      {actions}

      <div
        className={cn(
          "absolute left-8 top-10 z-10",
          contentClassName,
        )}
      >
        {statusIcon}

        <p
          className={cn(
            "text-xs font-medium text-brand",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>

        <h1
          className={cn(
            "mt-2 font-bold leading-none text-white",
            titleSize === "lg"
              ? "text-5xl"
              : titleSize === "md"
                ? "text-4xl"
                : "text-3xl",
          )}
        >
          {titleLead}
          <br />
          <span className="text-brand">{titleAccent}</span>
        </h1>

        {description && (
          <p
            className={cn(
              "mt-4 text-sm text-zinc-400",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
    </div>
  );
}