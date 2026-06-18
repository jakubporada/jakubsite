import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Virginia Tech identity on a warm dark base.
        maroon: {
          DEFAULT: "#861F41", // legible "screen maroon"
          light: "#b8456a",
          deep: "#630031", // official Chicago Maroon
          dark: "#4d1126",
        },
        burnt: {
          DEFAULT: "#E5751F",
          light: "#f59749",
          deep: "#CF4420", // official Burnt Orange
          dark: "#b35415",
        },
        // Hokie Stone — the warm dolomite-gray neutral family.
        hokie: {
          DEFAULT: "#8b827a",
          50: "#f4f1ec",
          100: "#d8d1c7",
          200: "#b3aaa0",
          300: "#8b827a",
          400: "#6b635c",
          500: "#4f4843",
          600: "#3a342f",
        },
        // Warm near-black base (not cool/blue) — refined, not "AI default".
        ink: {
          DEFAULT: "#14100e",
          900: "#100c0a",
          800: "#1a1512",
          700: "#221b16",
          600: "#2e251e",
        },
        cream: "#f5efe6", // headings
        sand: "#c8b8a8", // secondary text
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.55" },
        },
        // The live "detection signal" sweeping the hero.
        "signal-dash": {
          "0%": { strokeDashoffset: "1400" },
          "100%": { strokeDashoffset: "0" },
        },
        // Marquee for the certifications ticker.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Pulsing status dot.
        ping: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        "signal-dash": "signal-dash 6s linear infinite",
        marquee: "marquee 32s linear infinite",
        ping: "ping 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
