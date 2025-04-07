/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "960px", xl: "1200px" },
    extend: {
      fontFamily: { oxanium: "Oxanium" },
      colors: {
        primary: "#16191D",
        red: "#E10600",
        secondary: "#101215",
      },
      keyframes: {
        pulseHeight1: {
          "0%, 100%": { height: "100%" },
          "50%": { height: "90%" },
        },
        pulseHeight2: {
          "0%, 100%": { height: "95%" },
          "50%": { height: "85%" },
        },
        pulseHeight3: {
          "0%, 100%": { height: "90%" },
          "50%": { height: "80%" },
        },
      },
      animation: {
        "pulse-height-1": "pulseHeight1 1s ease-in-out infinite",
        "pulse-height-2": "pulseHeight2 1s ease-in-out infinite 0.2s",
        "pulse-height-3": "pulseHeight3 1s ease-in-out infinite 0.4s",
      },
    },
  },
  plugins: [],
}
