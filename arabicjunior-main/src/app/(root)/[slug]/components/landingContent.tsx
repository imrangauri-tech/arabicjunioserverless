import React from "react";
import { iconFor } from "@/lib/sectionIcons";
import { DEFAULT_LANDING_SLUG, LEGACY_LANDING_SLUG } from "@/lib/landing";

/** Default page (/trial-benefits) is the Dubai page; "abu-dhabi" → "Abu Dhabi". */
export const cityFromSlug = (slug: string | undefined) =>
  !slug || slug === DEFAULT_LANDING_SLUG || slug === LEGACY_LANDING_SLUG || slug === "landing"
    ? "Dubai"
    : slug
        .split("-")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

/** Swaps `{city}` in every string of a value, however deeply nested. */
export function fillCity<T>(value: T, city: string): T {
  if (typeof value === "string") {
    return value.replace(/\{city\}/gi, city) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fillCity(item, city)) as unknown as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, fillCity(item, city)])
    ) as T;
  }
  return value;
}

/**
 * Admin text with `**words**` shown bold. Plain text otherwise — React escapes
 * it, so nothing an admin types can inject markup.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={index} className="font-semibold text-neutral-800">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function LandingIcon({
  name,
  className = "w-5 h-5 text-orange-500",
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconFor(name);
  return <Icon className={className} />;
}
