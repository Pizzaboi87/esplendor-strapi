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
      },
      keyframes: {
        pulseStrong: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        loadingSpinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rollOnce: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        }
      },
      animation: {
        pulseStrong: 'pulseStrong 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        loadingSpinner: 'loadingSpinner 5s linear infinite',
        rollOnce: 'rollOnce 0.5s linear',
      },
    }
  },
  plugins: [],
} satisfies Config;
