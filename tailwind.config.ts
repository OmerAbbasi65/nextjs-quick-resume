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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideChevronLeft: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '50%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-10px)', opacity: '0' },
        },
        slideChevronRight: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '50%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(10px)', opacity: '0' },
        },
      },
      animation: {
        'slide-chevron-left': 'slideChevronLeft 1.5s ease-in-out infinite',
        'slide-chevron-right': 'slideChevronRight 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
