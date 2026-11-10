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
        bg: "#080808",
        surface: {
          1: "#111110",
          2: "#181816",
          3: "#222220",
        },
        ink: "#F3EEE4",
        muted: "#A29D92",
        dim: "#6E6A61",
        line: "rgba(243, 238, 228, 0.1)",
        lineGold: "rgba(212, 184, 122, 0.28)",
        gold: {
          DEFAULT: "#D4B87A",
          light: "#EFDDB0",
          dark: "#8E7544",
        },
        status: {
          done: "#7BD3A8",
          proto: "#AFA3FF",
          wip: "#E8BC68",
          idea: "#8F8D9A",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 45s linear infinite",
        "spin-reverse": "spin 32s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
