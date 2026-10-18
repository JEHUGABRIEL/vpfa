import type { MetadataRoute } from "next";
import { posts, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/a-propos", priority: 0.8 },
    { path: "/nos-actions", priority: 0.8 },
    { path: "/formations", priority: 0.9 },
    { path: "/actualites", priority: 0.7 },
    { path: "/soutenir", priority: 0.8 },
    { path: "/credits", priority: 0.3 },
    { path: "/mentions-legales", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: "2026-10-17",
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/actualites/${post.slug}`,
      lastModified: post.isoDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
