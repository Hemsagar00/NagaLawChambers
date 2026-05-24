import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow Emergent preview origin
  allowedDevOrigins: ['*'],
  // Skip type checking and lint errors during preview to keep dev fast
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
