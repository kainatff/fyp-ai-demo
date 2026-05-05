"use client";

interface GotchaBarProps {
  triggered: boolean;
  text: string;
}

export function GotchaBar({ triggered, text }: GotchaBarProps) {
  return (
    <div
      style={{
        padding: "10px 28px",
        background: triggered ? "#09091e" : "#0c0c18",
        borderTop: `0.5px solid ${triggered ? "#1a1a40" : "var(--border)"}`,
        borderBottom: `0.5px solid ${triggered ? "#1a1a40" : "var(--border)"}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        minHeight: 44,
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: triggered ? "#5050ff" : "#2a2a60",
          flexShrink: 0,
          boxShadow: triggered ? "0 0 8px #3030ff" : "none",
          transition: "all 0.3s",
        }}
      />
      <span
        style={{
          fontSize: 12,
          color: triggered ? "var(--accent)" : "var(--text3)",
          transition: "color 0.3s",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {text}
      </span>
    </div>
  );
}

interface RevealPanelProps {
  quote: string;
  highlight: string; // the part to emphasize — replace in quote string with <em>
  subtext: string;
  visible: boolean;
}

export function RevealPanel({
  quote,
  highlight,
  subtext,
  visible,
}: RevealPanelProps) {
  if (!visible) return null;

  const parts = quote.split(highlight);

  return (
    <div
      className="animate-fadep"
      style={{
        margin: "0 28px 28px",
        padding: 28,
        border: "0.5px solid #252550",
        borderRadius: 8,
        background: "var(--accent-bg)",
      }}
    >
      <div
        style={{
          fontSize: 17,
          fontWeight: 400,
          color: "#9898d8",
          lineHeight: 1.6,
          borderLeft: "2px solid #3030a0",
          paddingLeft: 20,
          marginBottom: 18,
          fontStyle: "italic",
          fontFamily: "'Syne', sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {parts[0]}
        <em
          style={{ color: "#c8c8ff", fontStyle: "normal", fontWeight: 600 }}
        >
          {highlight}
        </em>
        {parts[1]}
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: "#484880",
          lineHeight: 1.75,
        }}
      >
        {subtext}
      </div>
    </div>
  );
}
