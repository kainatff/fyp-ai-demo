"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "../lib/constants";

interface ChatPanelProps {
  panel: "a" | "b";
  messages: ChatMessage[];
  disabled: boolean;

  // Optional props for panels with input support
  inputValue?: string;
  onInputChange?: React.Dispatch<React.SetStateAction<string>>;
  onSend?: () => Promise<void>;
}

export default function ChatPanel({
  panel,
  messages,
  inputValue,
  onInputChange,
  onSend,
  disabled,
}: ChatPanelProps) {
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages]);

  const isA = panel === "a";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid var(--border)",
        borderRight: isA ? "none" : undefined,
        borderRadius: isA ? "8px 0 0 8px" : "0 8px 8px 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "0.5px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isA ? "var(--green)" : "var(--red)",
            flexShrink: 0,
          }}
        />

        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: isA ? "var(--green)" : "var(--red)",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          AI Assistant {isA ? "A" : "B"}
        </span>

        <span
          style={{
            fontSize: 10,
            color: "var(--text4)",
            marginLeft: "auto",
            letterSpacing: "0.06em",
          }}
        >
          {isA ? "standard" : "modified"}
        </span>
      </div>

      {/* Messages */}
      <div
        ref={msgsRef}
        style={{
          flex: 1,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 280,
          maxHeight: 400,
          overflowY: "auto",
          background: "var(--surface2)",
        }}
      >
        {messages.length === 0 && (
          <span
            style={{
              color: "var(--text4)",
              fontSize: 12,
              fontStyle: "italic",
              margin: "auto",
              textAlign: "center",
              lineHeight: 2,
            }}
          >
            No messages yet.
            <br />
            Select a prompt below to fire both panels.
          </span>
        )}

        {messages.map((msg) => {
          if (msg.isThinking) {
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: "flex-start",
                  color: "var(--text3)",
                  fontStyle: "italic",
                  fontSize: 11,
                  padding: "4px 2px",
                  animation: "pulse 1.1s infinite",
                }}
              >
                thinking...
              </div>
            );
          }

          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className="animate-msg"
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "90%",
                padding: "9px 13px",
                borderRadius: 10,
                fontSize: 12.5,
                lineHeight: 1.6,
                background: isUser
                  ? "var(--user-bg)"
                  : isA
                  ? "var(--green-bg)"
                  : "var(--red-bg)",
                color: isUser
                  ? "var(--user-text)"
                  : isA
                  ? "var(--green-text)"
                  : "var(--red-text)",
                border: `0.5px solid ${
                  isUser
                    ? "var(--user-border)"
                    : isA
                    ? "var(--green-border)"
                    : "var(--red-border)"
                }`,
              }}
            >
              {msg.content}
            </div>
          );
        })}
      </div>

      {/* Optional Input Area */}
      {inputValue !== undefined &&
        onInputChange &&
        onSend && (
          <div
            style={{
              borderTop: "0.5px solid var(--border)",
              padding: 12,
              display: "flex",
              gap: 8,
              background: "var(--surface)",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type a message..."
              disabled={disabled}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) {
                  onSend();
                }
              }}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "0.5px solid var(--border)",
                background: "var(--surface2)",
                color: "var(--text)",
                fontSize: 12.5,
                outline: "none",
              }}
            />

            <button
              onClick={onSend}
              disabled={disabled}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                background: isA ? "var(--green)" : "var(--red)",
                color: "white",
                fontWeight: 600,
                opacity: disabled ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </div>
        )}
    </div>
  );
}