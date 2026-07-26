import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lavender Real Estate",
    short_name: "Lavender",
    description:
      "Lavender Real Estate offers premium sales, leasing, and consultancy services across Abu Dhabi and the UAE.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#1A0A2E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
