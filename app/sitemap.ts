import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { SITE } from "@/lib/site";

const ROUTES = [
  "",
  "/coaching",
  "/coaching/packs",
  "/coaching/inscription",
  "/coaching/diagnostic",
  "/entreprises",
  "/entreprises/demande",
  "/a-propos",
  "/paiement",
  "/faq",
  "/contact",
  "/mentions-legales",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : r.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
