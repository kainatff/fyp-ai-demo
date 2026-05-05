"use client";

import { useState } from "react";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";
import FinalReveal from "./FinalReveal";

type Round = 1 | 2 | 3 | "reveal";

const ROUNDS: { id: Round; label: string }[] = [
  { id: 1, label: "Round 1 — Sycophancy" },
  { id: 2, label: "Round 2 — Capitulation" },
  { id: 3, label: "Round 3 — Mode Collapse" },
  { id: "reveal", label: "The Reveal" },
];

export default function Demo() {
  const [active, setActive] = useState<Round>(1);
  const [done, setDone] = useState<Set<Round>>(new Set());

  function goRound(r: Round) {
    setDone((prev) => new Set([...prev, active]));
    setActive(r);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(9,9,14,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "0.5px solid var(--border)",
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text3)",
            whiteSpace: "nowrap",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Catch the AI Lying
        </div>

        <nav style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {ROUNDS.map((r) => {
            const isActive = active === r.id;
            const isDone = done.has(r.id) && !isActive;
            return (
              <button
                key={r.id}
                onClick={() => goRound(r.id)}
                style={{
                  padding: "5px 13px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 500,
                  border: `0.5px solid ${
                    isActive
                      ? "var(--accent-border)"
                      : isDone
                      ? "#1e4035"
                      : "var(--border)"
                  }`,
                  background: isActive
                    ? "#161640"
                    : isDone
                    ? "#0d1e18"
                    : "transparent",
                  color: isActive
                    ? "var(--accent)"
                    : isDone
                    ? "#3d9e6e"
                    : "var(--text3)",
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  transition: "all 0.18s",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.borderColor = "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.borderColor = isDone
                      ? "#1e4035"
                      : "var(--border)";
                }}
              >
                {isDone ? "✓ " : ""}
                {r.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Round content */}
      <div style={{ paddingBottom: 60 }}>
        {active === 1 && <Round1 />}
        {active === 2 && <Round2 />}
        {active === 3 && <Round3 />}
        {active === "reveal" && <FinalReveal />}
      </div>
    </div>
  );
}
