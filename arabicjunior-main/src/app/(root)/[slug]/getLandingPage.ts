import { cache } from "react";
import { REVALIDATE_SECONDS } from "@/lib/contentApi";
import type { TrialLandingPage } from "@/types/TrialLanding";
import { cityFromSlug, fillCity } from "./components/landingContent";

export type LandingResult =
  | { status: "ok"; page: TrialLandingPage; city: string }
  | { status: "missing" }
  | { status: "error" };

/**
 * One landing page by slug, with `{city}` already filled in.
 *
 * "missing" (the API answered 404) and "error" (it could not be reached) are
 * kept apart: the first is a real 404, the second must not be — rendering a
 * 404 while the API is asleep would tell search engines the page is gone.
 *
 * Wrapped in `cache` so the layout's metadata and the page share one request.
 */
export const getLandingPage = cache(async (slug: string): Promise<LandingResult> => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return { status: "error" };

  try {
    const res = await fetch(`${base}/trial-landing/${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.status === 404) return { status: "missing" };
    if (!res.ok) return { status: "error" };

    const json = await res.json();
    const raw = json?.data as TrialLandingPage | undefined;
    if (!raw) return { status: "missing" };

    const city = raw.city?.trim() || cityFromSlug(raw.slug);
    return { status: "ok", page: fillCity(raw, city), city };
  } catch {
    return { status: "error" };
  }
});
