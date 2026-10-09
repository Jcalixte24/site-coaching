import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/connexion"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
