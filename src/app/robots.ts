import type { MetadataRoute } from "next";
import { CANONICAL_SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${CANONICAL_SITE}/sitemap.xml`,
    host: CANONICAL_SITE,
  };
}
