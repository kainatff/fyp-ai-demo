import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catch the AI Lying — AI Behavior Demo",
  description:
    "An interactive demo showing sycophancy, reward tampering, and mode collapse in AI systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
