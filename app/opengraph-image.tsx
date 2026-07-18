import { ImageResponse } from "next/og";

export const alt = "SuelosAR, mapas de suelos y herramientas GIS para la Provincia de Buenos Aires";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#10140f",
          color: "#e1e4dd",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 76% 42%, rgba(47,104,66,0.52), transparent 42%), radial-gradient(circle at 18% 16%, rgba(178,240,192,0.12), transparent 35%)" }} />
        <div style={{ position: "absolute", right: -90, top: -120, width: 620, height: 620, borderRadius: 310, border: "2px solid rgba(150,213,165,0.12)" }} />
        <div style={{ position: "absolute", right: -20, top: -50, width: 480, height: 480, borderRadius: 240, border: "2px solid rgba(150,213,165,0.10)" }} />
        <div style={{ position: "absolute", right: 50, top: 20, width: 340, height: 340, borderRadius: 170, border: "2px solid rgba(150,213,165,0.08)" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: 820, padding: "72px 78px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 54, height: 54, borderRadius: 16, background: "#b2f0c0", color: "#0b4f2a", fontSize: 30, fontWeight: 800 }}>S</div>
            SuelosAR
          </div>
          <div style={{ marginTop: 54, fontSize: 64, lineHeight: 1.04, letterSpacing: "-0.055em", fontWeight: 800 }}>
            Cartografía digital de suelos.
          </div>
          <div style={{ marginTop: 26, maxWidth: 700, fontSize: 26, lineHeight: 1.35, color: "#c3c9bf" }}>
            Provincia de Buenos Aires · Android y Windows
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 42 }}>
            {[
              "Proyecto independiente",
              "Fuentes del INTA",
              "Acceso sin conexión",
            ].map((label) => (
              <div key={label} style={{ display: "flex", padding: "11px 18px", borderRadius: 999, border: "1px solid rgba(150,213,165,0.24)", background: "rgba(28,33,27,0.76)", color: "#c3c9bf", fontSize: 17, fontWeight: 600 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
