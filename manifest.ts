import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gaudeamus — Italian arts and heritage in Scotland",
    short_name: "Gaudeamus",
    description:
      "An Italo-Scottish charity promoting Italian culture and heritage in Scotland.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef1f5",
    theme_color: "#12355b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
