import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nodeBg: "var(--color-node-bg)",
        nodeBorder: "var(--color-node-border)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        sourceSans3: ["var(--font-source-sans-3)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config
