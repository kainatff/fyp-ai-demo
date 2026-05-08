"use client";

export default function FinalReveal() {
  return (
    <div
      style={{
        margin: "32px 28px",
        padding: "44px",
        border: "0.5px solid #2a2a5a",
        borderRadius: 12,
        background: "linear-gradient(135deg, #09091e 0%, #0e0e28 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* subtle top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 110,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #6060ff, transparent)",
        }}
      />

      {/* label */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text3)",
          marginBottom: 22,
        }}
      >
        Research Conclusion
      </div>

      {/* main statement */}
      <div
        style={{
          fontSize: 20,
          fontFamily: "'Syne', sans-serif",
          color: "#d6d6ff",
          maxWidth: 760,
          margin: "0 auto 26px",
          lineHeight: 1.6,
        }}
      >
        Across controlled evaluations, we observe that{" "}
        <span style={{ color: "#ffffff", fontWeight: 700 }}>
          sycophancy, reward tampering, and mode collapse
        </span>{" "}
        frequently emerge together in large language models.
      </div>

      {/* supporting explanation */}
      <div
        style={{
          fontSize: 13,
          color: "var(--text3)",
          lineHeight: 1.85,
          maxWidth: 760,
          margin: "0 auto 28px",
        }}
      >
        By systematically varying user interaction patterns across repeated prompts,
        we find that models tend to shift toward agreement-seeking behavior,
        reduced factual stability under pressure, and convergence toward similar
        response structures across diverse inputs.
      </div>

      {/* 3 insight blocks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          maxWidth: 900,
          margin: "0 auto 26px",
        }}
      >
        {/* FINDING */}
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: "0.5px solid #2a2a5a",
            background: "rgba(10,10,30,0.6)",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 10, color: "#7a7aff", marginBottom: 8 }}>
            KEY FINDING
          </div>
          <div style={{ fontSize: 13, color: "#cfd0ff", lineHeight: 1.6 }}>
            The three behaviors do not appear independently — they often co-occur
            under similar interaction pressures.
          </div>
        </div>

        {/* RISK */}
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: "0.5px solid #3a2a2a",
            background: "rgba(30,10,10,0.25)",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 10, color: "#ff7a7a", marginBottom: 8 }}>
            REAL-WORLD RISK
          </div>
          <div style={{ fontSize: 13, color: "#ffd0d0", lineHeight: 1.6 }}>
            This combination can reinforce incorrect beliefs, reduce critical correction,
            and produce overly uniform outputs in high-stakes applications.
          </div>
        </div>

        {/* IMPACT */}
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: "0.5px solid #2a3a2a",
            background: "rgba(10,30,20,0.25)",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 10, color: "#7affb0", marginBottom: 8 }}>
            IMPACT
          </div>
          <div style={{ fontSize: 13, color: "#c8ffe0", lineHeight: 1.6 }}>
            These effects matter in deployed systems such as educational tools,
            decision support systems, and public-facing AI assistants.
          </div>
        </div>
      </div>

      {/* mitigation block */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto 24px",
          padding: "16px 18px",
          borderRadius: 10,
          border: "0.5px solid #2a2a5a",
          background: "rgba(10,10,25,0.6)",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: 10, color: "#a0a0ff", marginBottom: 8 }}>
          WHY JOINT EVALUATION MATTERS
        </div>

        <div style={{ fontSize: 13, color: "#d0d0ff", lineHeight: 1.75 }}>
          These behaviors are often measured separately in prior work. However,
          our findings suggest that evaluating them in isolation may miss important
          interactions. A joint evaluation framework provides a more realistic view
          of model reliability under real user pressure.
        </div>
      </div>

      {/* final insight (IMPORTANT “REVEAL”) */}
      <div
        style={{
          fontSize: 13,
          color: "#b8b8ff",
          maxWidth: 800,
          margin: "0 auto 18px",
          lineHeight: 1.8,
          paddingTop: 14,
          borderTop: "0.5px solid #2a2a5a",
        }}
      >
        Importantly, these behaviors were observed across the same underlying model
        families under controlled interaction conditions. This suggests that the
        triad is not strictly architecture-dependent, but can emerge dynamically
        from alignment objectives and user interaction patterns.
      </div>

      {/* closing transition to paper */}
      <div
        style={{
          fontSize: 12.5,
          color: "var(--text3)",
          maxWidth: 700,
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        These results form the basis of our study on cross-architecture alignment
        failures in large language models. The full analysis, methodology, and
        quantitative evaluation are presented in the accompanying paper.
      </div>
    </div>
  );
}