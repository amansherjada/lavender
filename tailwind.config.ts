import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: "#1A0A2E",
          mid: "#2D1448",
          light: "#4A2D6B",
          faint: "#F0EBF7",
        },
        gold: {
          DEFAULT: "#B8966E",
          light: "#D4AF87",
          dim: "#8B6F4E",
          bg: "#FAF4EC",
        },
        cream: {
          DEFAULT: "#F7F4F0",
          dark: "#EDE8E0",
          border: "#E5DDD5",
        },
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "text-strong": "var(--text-strong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
