import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f5",
        card: "#0b0b0b",
        border: "#202020",
        muted: "#8f8f8f"
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "sans-serif"]
      },
      borderWidth: {
        hairline: "0.5px"
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      boxShadow: {
        noir: "0 10px 30px rgba(0,0,0,0.5)"
      }
    }
  },
  plugins: []
};

export default config;
