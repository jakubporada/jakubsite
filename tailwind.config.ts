import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Virginia Tech inspired palette on a dark base
        maroon: {
          DEFAULT: "#861F41",
          light: "#a83258",
          dark: "#5e1430",
        },
        burnt: {
          DEFAULT: "#E87722",
          light: "#f59145",
          dark: "#c2611a",
        },
        hokie: "#75787b", // Hokie Stone gray
        ink: {
          DEFAULT: "#0a0a0c",
          800: "#101013",
          700: "#16161a",
          600: "#1e1e24",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
