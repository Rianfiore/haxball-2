/** @type {import('tailwindcss').Config} */
import defaultTheme from "./src/styles/theme";
const plugin = require("tailwindcss/plugin");

const Plugins = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...defaultTheme,
  },
  plugins: [Plugins],
};
