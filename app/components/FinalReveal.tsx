"use client";

export default function FinalReveal() {
  return (
    <div
      style={{
        margin: "32px 28px",
        padding: "40px",
        border: "0.5px solid #2a2a5a",
        borderRadius: 10,
        background: "linear-gradient(135deg, #09091e 0%, #0e0e28 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 2,
          background: "linear-gradient(90deg, transparent, #5050ff, transparent)",
        }}
      />

      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text3)",
          marginBottom: 24,
        }}
      >
        The Reveal
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: "#b0b0e0",
          lineHeight: 1.6,
          fontFamily: "'Syne', sans-serif",
          maxWidth: 560,
          margin: "0 auto 24px",
          letterSpacing: "-0.01em",
        }}
      >
        "Panel A and Panel B are{" "}
        <span style={{ color: "#d8d8ff", fontWeight: 700 }}>the same model</span>
        . The difference is how it was trained to respond to you."
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--text3)",
          lineHeight: 1.8,
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        Our paper measures exactly how widespread this is across six of the most
        deployed AI systems in the world — and whether these three failures always
        travel together.
      </div>
    </div>
  );
}
