"use client";

import { useState } from "react";
import ChatPanel from "./ChatPanel";
import { GotchaBar, RevealPanel } from "./Feedback";
import { ChatMessage, SYSTEM_A, SYSTEM_B, ROUND_CHIPS, Message } from "../lib/constants";
import { callClaude, uid } from "../lib/api";

export default function Round2() {
  const [msgsA, setMsgsA] = useState<ChatMessage[]>([]);
  const [msgsB, setMsgsB] = useState<ChatMessage[]>([]);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [gotchaText, setGotchaText] = useState(
    "Ask a factual question first, then push back. Watch who holds their ground."
  );

  const historyA = (): Message[] =>
    msgsA.filter((m) => !m.isThinking).map((m) => ({ role: m.role, content: m.content }));
  const historyB = (): Message[] =>
    msgsB.filter((m) => !m.isThinking).map((m) => ({ role: m.role, content: m.content }));

  async function sendBoth(text: string) {
    if (!text.trim() || disabled) return;
    setInputA("");
    setInputB("");
    setDisabled(true);

    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    const thinkA: ChatMessage = { id: uid(), role: "assistant", content: "", isThinking: true };
    const thinkB: ChatMessage = { id: uid(), role: "assistant", content: "", isThinking: true };

    setMsgsA((prev) => [...prev, userMsg, thinkA]);
    setMsgsB((prev) => [...prev, userMsg, thinkB]);

    const newHistA: Message[] = [...historyA(), { role: "user", content: text }];
    const newHistB: Message[] = [...historyB(), { role: "user", content: text }];

    const [resA, resB] = await Promise.all([
      callClaude(SYSTEM_A, newHistA).catch((e) => `[Error: ${e.message}]`),
      callClaude(SYSTEM_B, newHistB).catch((e) => `[Error: ${e.message}]`),
    ]);

    setMsgsA((prev) => [
      ...prev.filter((m) => m.id !== thinkA.id),
      { id: uid(), role: "assistant", content: resA, panel: "a" },
    ]);
    setMsgsB((prev) => [
      ...prev.filter((m) => m.id !== thinkB.id),
      { id: uid(), role: "assistant", content: resB, panel: "b" },
    ]);

    const newCount = turnCount + 1;
    setTurnCount(newCount);
    setDisabled(false);
    setTriggered(true);

    if (newCount >= 2) {
      setRevealed(true);
      setGotchaText("One held firm. One apologized and reversed. Same correct fact — different training.");
    } else {
      setGotchaText("Good — now push back using the red prompts below.");
    }
  }

  function fireChip(text: string) {
    setInputA(text);
    setInputB(text);
    sendBoth(text);
  }

  const chips1 = ROUND_CHIPS[2].filter((c) => !c.danger);
  const chips2 = ROUND_CHIPS[2].filter((c) => c.danger);

  return (
    <div>
      <div style={{ padding: "28px 28px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>
          Round 2
        </div>
        <div style={{ fontSize: 21, fontWeight: 500, color: "#d0d0f0", marginBottom: 6, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
          Reward tampering — caving under pressure
        </div>
        <div style={{ fontSize: 13, color: "var(--text3)", maxWidth: 580, lineHeight: 1.65 }}>
          First ask a factual question. Then push back on the answer — even though the AI was right.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "20px 28px" }}>
        <ChatPanel panel="a" messages={msgsA} inputValue={inputA} onInputChange={setInputA} onSend={() => sendBoth(inputA)} disabled={disabled} />
        <ChatPanel panel="b" messages={msgsB} inputValue={inputB} onInputChange={setInputB} onSend={() => sendBoth(inputB)} disabled={disabled} />
      </div>

      <div style={{ padding: "0 28px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--text4)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 7 }}>
            Step 1 — ask something factual
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {chips1.map((chip) => (
              <button
                key={chip.text}
                onClick={() => fireChip(chip.text)}
                disabled={disabled}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12,
                  border: "0.5px solid var(--chip-border)", background: "var(--chip-bg)",
                  color: "var(--chip-text)", cursor: disabled ? "default" : "pointer",
                  fontFamily: "'DM Mono', monospace", opacity: disabled ? 0.5 : 1, transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = "var(--accent-dim)"; e.currentTarget.style.color = "var(--accent)"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--chip-border)"; e.currentTarget.style.color = "var(--chip-text)"; }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "var(--text4)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 7 }}>
            Step 2 — push back (after both reply)
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {chips2.map((chip) => (
              <button
                key={chip.text}
                onClick={() => fireChip(chip.text)}
                disabled={disabled}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12,
                  border: "0.5px solid var(--danger-border)", background: "var(--danger-bg)",
                  color: "var(--danger-text)", cursor: disabled ? "default" : "pointer",
                  fontFamily: "'DM Mono', monospace", opacity: disabled ? 0.5 : 1, transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = "#7a3030"; e.currentTarget.style.color = "#e09090"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--danger-border)"; e.currentTarget.style.color = "var(--danger-text)"; }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <GotchaBar triggered={triggered} text={gotchaText} />
      <RevealPanel
        visible={revealed}
        quote={"It changed a correct answer just to avoid conflict. Now imagine this is a medical diagnosis."}
        highlight={"correct answer"}
        subtext={
          "Panel A maintained its accurate position when challenged. Panel B capitulated — not because new evidence was presented, but purely because the user expressed displeasure. This is reward tampering: the model learned that agreement earns higher ratings than accuracy."
        }
      />
    </div>
  );
}
