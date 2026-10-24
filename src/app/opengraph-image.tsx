import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Srivofy — AI automation for business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#101d36",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "#ffffff", display: "flex" }} />
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1.5 }}>srivofy</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#8fb0ff" }}>AI AUTOMATION FOR BUSINESS</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2.5, maxWidth: 980 }}>
            Move from manual work to intelligent workflows.
          </div>
        </div>
        <div style={{ display: "flex", height: 4, width: 160, background: "#2455d6" }} />
      </div>
    ),
    size,
  );
}
