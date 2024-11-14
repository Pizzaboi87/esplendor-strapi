import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aboreto: ["Aboreto", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
        bonheur_royale: ["Bonheur Royale", "serif"],
      },
      colors: {
        "dark-500": "rgb(62, 37, 34)",
        "background": "rgb(255, 250, 243)",
        "selection": "rgb(255, 250, 225)",
        "primary": "rgb(255, 224, 178)",
        "secondary": "rgb(211, 163, 118)",
        "terciary": "rgb(140, 110, 99)",
        "black-bg": "rgb(45,45,45)",
        "dark-gray-bg": "rgb(55,55,55)",
        "deep-gray-bg": "rgb((50,57,61)"
      },
      screens: {
        "xs": "380px",
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1360px",
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
