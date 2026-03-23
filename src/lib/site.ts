/** Production canonical URL — used for metadata, OG image asset URLs, sitemap, and JSON-LD. */
export const CANONICAL_SITE = "https://supratikch.com" as const;

/** Origin for absolute asset URLs (OG image fetch). Prefers env in preview/local. */
export function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return CANONICAL_SITE;
}
