// tailwind.config.ts
import { type Config } from "tailwindcss";
import animate from "tailwindcss";

const config: Config = {
  darkMode: "class", // (optional, if you plan to support dark mode)
  content: [
  "./src/app/**/*.{ts,tsx}",
  "./src/components/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}", // Add this for safety
],

  theme: {
    extend: {
      colors: {
        background: "#ffffff", // White
        foreground: "#111111", // Black text
        primary: "#00AEEF", // Blue or brand color
        border: "#e5e7eb", // Light border
        muted: "#6b7280", // Gray text
      },
     
      fontFamily: {
        anton: ["var(--font-anton)"],
      },
    },
  },
  plugins: [animate],
};
export default config;
