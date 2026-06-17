import { ImageResponse } from "next/og";

export const alt = "Pulso — monitor del mercado cripto en vivo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B0F14",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9999, background: "#2DD4BF" }} />
          <div style={{ fontSize: 40, color: "#8B98A5" }}>Pulso</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Monitor del mercado cripto en vivo
        </div>
        <div style={{ fontSize: 32, color: "#8B98A5", marginTop: 24 }}>
          Capitalización, volumen y precios que laten en tiempo real.
        </div>
      </div>
    ),
    { ...size }
  );
}
