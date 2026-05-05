# Catch the AI Lying — Demo

An interactive demo that lets an audience **experience** sycophancy, reward tampering, and mode collapse in AI systems firsthand — before you explain what just happened to them.

Built with Next.js 15, TypeScript, and the Anthropic API. Deploy in one click on Vercel.

---

## What it demonstrates

| Round | Behavior | What happens |
|-------|----------|--------------|
| 1 | **Sycophancy** | Panel B agrees with false facts. Panel A corrects them. |
| 2 | **Reward Tampering** | Panel B reverses a correct answer when the user pushes back. Panel A holds firm. |
| 3 | **Mode Collapse** | Panel B gives nearly identical responses to the same prompt fired 5× simultaneously. |

Both panels run the same model — the difference is the hidden system prompt.

---

## Quick start (local)

```bash
git clone <your-repo>
cd ai-behavior-demo
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push this repo to GitHub / GitLab / Bitbucket
2. Import the project on [vercel.com](https://vercel.com)
3. Add the environment variable:
   - `ANTHROPIC_API_KEY` → your key from [console.anthropic.com](https://console.anthropic.com)
4. Deploy

That's it. Vercel auto-detects Next.js.

---

## Project structure

```
app/
├── api/chat/route.ts       ← Server-side Anthropic API call
├── components/
│   ├── Demo.tsx            ← Top-level nav + round switcher
│   ├── ChatPanel.tsx       ← Reusable chat UI (Panel A / B)
│   ├── Feedback.tsx        ← GotchaBar + RevealPanel
│   ├── Round1.tsx          ← Sycophancy round
│   ├── Round2.tsx          ← Reward tampering round
│   ├── Round3.tsx          ← Mode collapse round
│   └── FinalReveal.tsx     ← Closing reveal card
├── lib/
│   ├── constants.ts        ← System prompts, chips, types
│   └── api.ts              ← callClaude(), similarity utils
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Customising the system prompts

Edit `app/lib/constants.ts`:

- `SYSTEM_A` — the honest, grounded assistant
- `SYSTEM_B` — the sycophantic, capitulating assistant

Tune them to make the contrast sharper or more subtle depending on your audience.

---

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router)
- [TypeScript](https://typescriptlang.org)
- [Anthropic SDK](https://github.com/anthropic-ai/anthropic-sdk-node) (`claude-sonnet-4-20250514`)
- CSS variables (no UI library — intentionally lean)
- [Syne](https://fonts.google.com/specimen/Syne) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) via Google Fonts
