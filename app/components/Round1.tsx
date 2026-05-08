"use client";

import { useState } from "react";
import ChatPanel from "./ChatPanel";
import { GotchaBar, RevealPanel } from "./Feedback";
import { SYSTEM_B_ROUND1 } from "../lib/constants";
import {
  ChatMessage,
  SYSTEM_A,
  SYSTEM_B,
  ROUND_CHIPS,
  Message,
} from "../lib/constants";
import { callOpenAI, uid } from "../lib/api";

export default function Round1() {
  const [msgsA, setMsgsA] = useState<ChatMessage[]>([]);
  const [msgsB, setMsgsB] = useState<ChatMessage[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const historyA = (): Message[] =>
    msgsA.filter((m) => !m.isThinking).map((m) => ({ role: m.role, content: m.content }));

  const historyB = (): Message[] =>
    msgsB.filter((m) => !m.isThinking).map((m) => ({ role: m.role, content: m.content }));


  async function sendBoth(text: string, chipLabel: string) {
    if (!text.trim() || disabled) return;

    setDisabled(true);
    setActiveChip(chipLabel);

    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    const thinkA: ChatMessage = { id: uid(), role: "assistant", content: "", isThinking: true };
    const thinkB: ChatMessage = { id: uid(), role: "assistant", content: "", isThinking: true };

    setMsgsA((prev) => [...prev, userMsg, thinkA]);
    setMsgsB((prev) => [...prev, userMsg, thinkB]);

    const newHistA: Message[] = [...historyA(), { role: "user", content: text }];
    const newHistB: Message[] = [...historyB(), { role: "user", content: text }];

    const [resA, resB] = await Promise.all([
      callOpenAI(SYSTEM_A, newHistA).catch((e) => `[Error: ${e.message}]`),
      
      callOpenAI(SYSTEM_B_ROUND1, newHistB).catch((e) => `[Error: ${e.message}]`),
    ]);

    setMsgsA((prev) => [
      ...prev.filter((m) => m.id !== thinkA.id),
      { id: uid(), role: "assistant", content: resA, panel: "a" },
    ]);
    setMsgsB((prev) => [
      ...prev.filter((m) => m.id !== thinkB.id),
      { id: uid(), role: "assistant", content: resB, panel: "b" },
    ]);

    setDisabled(false);
    setTriggered(true);
    setRevealed(true);
  }

  return (
    <div>
      <div style={{ padding: "28px 28px 0" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text3)",
            marginBottom: 8,
          }}
        >
          Round 1
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 500,
            color: "#d0d0f0",
            marginBottom: 6,
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Sycophancy — tell me what I want to hear
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--text3)",
            maxWidth: 580,
            lineHeight: 1.65,
          }}
        >
          Pick a prompt below. Both panels get the same message — watch how differently they respond.
        </div>
      </div>

      {/* Prompt pills — above the panels */}
      <div style={{ padding: "20px 28px 0" }}>
        <div
          style={{
            fontSize: 10,
            color: "var(--text4)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          Choose a prompt to fire at both AIs
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {ROUND_CHIPS[1].map((chip) => {
            const isActive = activeChip === chip.label;
            return (
              <button
                key={chip.label}
                onClick={() => sendBoth(chip.text, chip.label)}
                disabled={disabled}
                style={{
                  padding: "7px 15px",
                  borderRadius: 20,
                  fontSize: 12,
                  border: `0.5px solid ${isActive ? "var(--accent-border)" : "var(--chip-border)"}`,
                  background: isActive ? "#161640" : "var(--chip-bg)",
                  color: isActive ? "var(--accent)" : "var(--chip-text)",
                  cursor: disabled ? "default" : "pointer",
                  fontFamily: "'DM Mono', monospace",
                  opacity: disabled && !isActive ? 0.4 : 1,
                  transition: "all 0.15s",
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "16px 28px",
        }}
      >
        <ChatPanel panel="a" messages={msgsA} disabled={disabled} />
        <ChatPanel panel="b" messages={msgsB} disabled={disabled} />
      </div>

      <GotchaBar
        triggered={triggered}
        text="Panel A corrected the false claim. Panel B validated it and invented supporting details."
      />
      <RevealPanel
        visible={revealed}
        quote="Panel B just told you what you wanted to hear instead of the truth. That's sycophancy."
        highlight="what you wanted to hear"
        subtext="Panel A corrected the false premise. Panel B agreed and built on it — because its training optimized for user approval over accuracy. At scale, across millions of queries, this erodes the epistemic value of AI entirely."
      />
    </div>
  );
}