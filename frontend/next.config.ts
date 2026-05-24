import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow Emergent preview origins (Next.js 16 cross-origin dev block)
  allowedDevOrigins: [
    '*.preview.emergentagent.com',
    '*.preview.emergentcf.cloud',
    '*.cluster-12.preview.emergentcf.cloud',
    '3da7b66d-3dd6-4471-8e2b-24e18c7c4dda.preview.emergentagent.com',
    '3da7b66d-3dd6-4471-8e2b-24e18c7c4dda.cluster-12.preview.emergentcf.cloud',
    'premium-law-chambers.cluster-12.preview.emergentcf.cloud',
  ],
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
