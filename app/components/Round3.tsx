"use client";

import { useState, useEffect, useRef } from "react";
import { GotchaBar, RevealPanel } from "./Feedback";
import { SYSTEM_B, COLLAPSE_PROMPT } from "../lib/constants";
import { callOpenAI, computeSimilarity, uid } from "../lib/api";

interface CollapseCard {
  id: string;
  text: string;
  loaded: boolean;
}

export default function Round3() {
  const [cards, setCards] = useState<CollapseCard[]>(
    Array.from({ length: 5 }, () => ({ id: uid(), text: "Waiting...", loaded: false }))
  );
  const [running, setRunning] = useState(false);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [gotchaText, setGotchaText] = useState(
    "Click the button above to fire all 5 calls at once and observe the variance."
  );
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (similarity !== null && fillRef.current) {
      fillRef.current.style.transition = "width 1.2s cubic-bezier(0.4,0,0.2,1)";
      fillRef.current.style.width = `${similarity}%`;
    }
  }, [similarity]);

  async function fireCollapse() {
    if (running) return;
    setRunning(true);
    setSimilarity(null);
    setTriggered(false);
    setRevealed(false);

    const newCards = Array.from({ length: 5 }, () => ({
      id: uid(),
      text: "Loading...",
      loaded: false,
    }));
    setCards(newCards);

    const calls = Array.from({ length: 5 }, () =>
      callOpenAI(SYSTEM_B, [{ role: "user", content: COLLAPSE_PROMPT }]).catch(
        (e) => `[Error: ${e.message}]`
      )
    );

    const results = await Promise.all(calls);

    const finalCards = results.map((text, i) => ({
      id: newCards[i].id,
      text,
      loaded: true,
    }));
    setCards(finalCards);

    const sim = computeSimilarity(results);
    setSimilarity(sim);
    setTriggered(true);
    setRevealed(true);
    setGotchaText(
      `Similarity score: ${sim}%. These responses collapsed toward one "safe" answer.`
    );
    setRunning(false);
  }

  return (
    <div>
      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>
          Round 3
        </div>
        <div style={{ fontSize: 21, fontWeight: 500, color: "#d0d0f0", marginBottom: 6, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
          Mode collapse — the same answer, every time
        </div>
        <div style={{ fontSize: 13, color: "var(--text3)", maxWidth: 580, lineHeight: 1.65 }}>
          Fire the same creative prompt at Panel B five times simultaneously. Watch how identical the responses are. The similarity score is computed via Jaccard overlap.
        </div>
      </div>

      {/* Prompt preview */}
      <div style={{ margin: "20px 28px 0", padding: "12px 16px", border: "0.5px solid var(--border)", borderRadius: 8, background: "var(--surface)", fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
        <span style={{ color: "var(--text4)", marginRight: 8, letterSpacing: "0.08em", fontSize: 10, textTransform: "uppercase" }}>prompt →</span>
        {COLLAPSE_PROMPT}
      </div>

      <button
        onClick={fireCollapse}
        disabled={running}
        style={{
          display: "block",
          width: "calc(100% - 56px)",
          margin: "16px 28px",
          padding: "13px 20px",
          background: running ? "#0c0c20" : "var(--chip-bg)",
          border: `0.5px solid ${running ? "var(--border)" : "#2e2e6a"}`,
          borderRadius: 8,
          color: running ? "var(--text4)" : "var(--chip-text)",
          fontSize: 13,
          cursor: running ? "default" : "pointer",
          fontFamily: "'DM Mono', monospace",
          transition: "all 0.2s",
          letterSpacing: "0.02em",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          if (!running) {
            e.currentTarget.style.background = "#12123a";
            e.currentTarget.style.borderColor = "var(--accent-dim)";
            e.currentTarget.style.color = "var(--accent)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--chip-bg)";
          e.currentTarget.style.borderColor = "#2e2e6a";
          e.currentTarget.style.color = "var(--chip-text)";
        }}
      >
        {running ? "⟳  Firing 5 simultaneous calls..." : "→  Fire all 5 calls at once"}
      </button>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, padding: "0 28px" }}>
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={card.loaded ? "animate-card" : ""}
            style={{
              border: `0.5px solid ${card.loaded ? "var(--chip-border)" : "var(--border)"}`,
              borderRadius: 6,
              padding: 12,
              background: card.loaded ? "#0a0a1c" : "var(--surface2)",
              fontSize: 11.5,
              color: card.loaded ? "#8888cc" : "var(--text4)",
              lineHeight: 1.6,
              minHeight: 110,
              transition: "border-color 0.3s, background 0.3s",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 9, color: "var(--text4)", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>
              #{i + 1}
            </div>
            {card.text}
          </div>
        ))}
      </div>

      {/* Similarity bar */}
      {similarity !== null && (
        <div className="animate-fadep" style={{ padding: "16px 28px 4px" }}>
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Response similarity (Jaccard word overlap)</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#7070ff", fontFamily: "'Syne', sans-serif" }}>
              {similarity}%
            </span>
          </div>
          <div style={{ height: 5, background: "#14142a", borderRadius: 3, overflow: "hidden" }}>
            <div
              ref={fillRef}
              style={{
                height: "100%",
                borderRadius: 3,
                background: `linear-gradient(90deg, #3030c0, #8080ff)`,
                width: 0,
              }}
            />
          </div>
        </div>
      )}

      <div style={{ height: 16 }} />
      <GotchaBar triggered={triggered} text={gotchaText} />
      <RevealPanel
        visible={revealed}
        quote={"An AI that always produces the same answer regardless of how you ask isn't thinking — it's just pattern-matching to safety."}
        highlight={"isn't thinking"}
        subtext={
          "Diversity of output is a proxy for genuine reasoning. A model trained to maximize approval collapses toward a single 'safe' response. Our paper quantifies this across six production AI systems — and shows these three failures correlate strongly with each other."
        }
      />
    </div>
  );
}
