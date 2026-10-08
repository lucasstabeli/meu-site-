import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lucasstabeli.github.io/meu-site-/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
