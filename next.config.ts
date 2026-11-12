import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://ai-auto-rag-backend.vercel.app',
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL || 'https://ai-auto-rag-backend.vercel.app',
    NEXT_PUBLIC_API_URL: process.env.BACKEND_URL || 'https://ai-auto-rag-backend.vercel.app',
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
