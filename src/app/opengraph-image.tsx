import { ImageResponse } from "next/og";

export const alt = "Compagnia Artistica Gaudeamus — Italian arts and culture in Scotland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          background: "#eef1f5",
          color: "#1e1e1e",
          fontFamily: "serif",
          backgroundImage:
            "radial-gradient(60% 80% at 0% 0%, rgba(167,192,224,0.22), transparent)",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5d6471",
          }}
        >
          <span>COMPAGNIA ARTISTICA · SCIO</span>
          <span>EST. ABERDEEN · 2023</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              display: "flex",
              fontSize: 148,
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Gaudeamus.
          </span>
          <span
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 54,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontStyle: "italic",
              color: "#a83232",
            }}
          >
            Italian theatre, culture and community across Scotland.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#5d6471",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>italiandramauk.org</span>
          <span>Aberdeen · Scotland</span>
        </div>
      </div>
    ),
    size,
  );
}
