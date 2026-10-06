import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/analytics/", "/feedback/"],
      },
    ],
    sitemap: "https://nuxgajurel.com/sitemap.xml",
    host: "https://nuxgajurel.com",
  };
}
