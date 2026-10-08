import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Obs.: num site de projeto do GitHub Pages o Google le o robots.txt da raiz do dominio;
// este arquivo passa a valer de verdade com dominio proprio. O sitemap ja pode ir no Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lucasstabeli.github.io/meu-site-/sitemap.xml",
  };
}
