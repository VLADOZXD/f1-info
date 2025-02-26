/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "960px", xl: "1200px" },
    extend: {
      fontFamily: { oxanium: "Oxanium" },
      colors: {
        background: "#16191D",
        red: "#E10600",
        scheduleBackground: "#0D0F11",
      },
    },
  },
  plugins: [],
}
