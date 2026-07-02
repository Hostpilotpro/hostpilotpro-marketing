import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F14",
        cream: "#F8F4ED",
        navy: {
          DEFAULT: "#1E3A5F",
          hover: "#16304F",
        },
        gold: "#B8894A",
        line: "#E5E2DB",
        muted: "#5C6470",
        surface: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "General Sans", "Satoshi", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        prose: "65ch",
      },
      fontSize: {
        hero: ["clamp(2.5rem, 1.5rem + 4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(2rem, 1.4rem + 2.4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        title: ["clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};

export default config;
