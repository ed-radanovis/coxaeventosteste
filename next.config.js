import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  devIndicators: false,

  // to next/image accept images from UploadThing
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // UploadThing domain
      },
    ],
  },

  experimental: {
    // compatibility with React and Next 15
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default config;
