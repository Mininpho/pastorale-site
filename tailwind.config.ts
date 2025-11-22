import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fond: "#f5f3ea",
        nuit: "#111827",
        orlit: "#d1a954",
        marial: "#3f6db5",
        marialLight: "#e7f0ff",
        marialDark: "#284c7b",
      },
    },
  },
  plugins: [],
};

export default config;
