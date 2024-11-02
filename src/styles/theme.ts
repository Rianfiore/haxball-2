export default {
  colors: {
    neutral: {
      white: "#ffffff",
      "white/50": "rgba(255,255,255,0.5)",
      "white/20": "rgba(255,255,255,0.2)",
      "white/10": "rgba(255,255,255,0.1)",
      "white/5": "rgba(255,255,255,0.05)",
      "white-100": "#f9fafb",
      "white-200": "#f4f6f8",
      "white-300": "#e5e7eb",
      "white-400": "#d2d6dc",
      "white-500": "#9fa6b2",
      "white-600": "#6b7280",
      "white-700": "#4b5563",
      "white-800": "#374151",
      "white-900": "#1f2937",
      black: "#000000",
      "black-100": "#0d0e10",
      "black-200/100": "rgba(26,28,32,1)",
      "black-200/50": "rgba(26,28,32,0.5)",
      "black-300": "#212529",
      "black-400": "#343a40",
      "black-500": "#495057",
      "black-600": "#6b7280",
      "black-700": "#868e96",
      "black-800": "#adb5bd",
      "black-900": "#ced4da",
    },
    support: {
      red: "#c14747",
      blue100: "#7d8ec1",
      blue200: "#a3b8f0",
      blue300: "#4774c1",
      blue400: "#3b5998",
      blue500: "#2d3e50",
      blue600: "#1d2533",
      blue700: "#131a22",
      blue800: "#0c1016",
      yellow: "#c1b547",
      green: "#47c15e",
      purple: "#7d47c1",
    },
  },
  fontSize: {
    xxxs: [
      "0.25rem",
      {
        fontSize: "0.25rem", // 4px
        lineHeight: "0.375rem", // 6px
      },
    ],
    xxs: [
      "0.5rem",
      {
        fontSize: "0.5rem", // 8px
        lineHeight: "0.75rem", // 12px
      },
    ],
    xs: [
      "0.75rem",
      {
        fontSize: "0.75rem", // 12px
        lineHeight: "1rem", // 16px
      },
    ],
    sm: [
      "0.875rem",
      {
        fontSize: "0.875rem", // 14px
        lineHeight: "1.25rem", // 20px
      },
    ],
    base: [
      "1rem",
      {
        fontSize: "1rem", // 16px
        lineHeight: "1.5rem", // 24px
      },
    ],
    lg: [
      "1.125rem",
      {
        fontSize: "1.125rem", // 18px
        lineHeight: "1.75rem", // 28px
      },
    ],
    xl: [
      "1.25rem",
      {
        fontSize: "1.25rem", // 20px
        lineHeight: "1.75rem", // 28px
      },
    ],
    "2xl": [
      "1.5rem",
      {
        fontSize: "1.5rem", // 24px
        lineHeight: "2rem", // 32px
      },
    ],
    "3xl": [
      "1.875rem",
      {
        fontSize: "1.875rem", // 30px
        lineHeight: "2.25rem", // 36px
      },
    ],
    "4xl": [
      "2.25rem",
      {
        fontSize: "2.25rem", // 36px
        lineHeight: "2.5rem", // 40px
      },
    ],
    "5xl": [
      "3rem",
      {
        fontSize: "3rem", // 48px
        lineHeight: "1", // default
      },
    ],
    "6xl": [
      "3.75rem",
      {
        fontSize: "3.75rem", // 60px
        lineHeight: "1", // default
      },
    ],
    "7xl": [
      "4.5rem",
      {
        fontSize: "4.5rem", // 72px
        lineHeight: "1", // default
      },
    ],
    "8xl": [
      "6rem",
      {
        fontSize: "6rem", // 96px
        lineHeight: "1", // default
      },
    ],
    "9xl": [
      "8rem",
      {
        fontSize: "8rem", // 128px
        lineHeight: "1", // default
      },
    ],
    "10xl": [
      "9rem",
      {
        fontSize: "9rem", // 144px
        lineHeight: "1", // default
      },
    ],
  },
  screens: {
    mobile: "320px",
    phablet: "480px",
    tablet: "640px",
    netbook: "800px",
    laptop: "1024px",
    desktop: "1280px",
    HD: "1366px",
    "HD+": "1536px",
    fullHD: "1920px",
    "2K": "2048px",
    "4K": "3840px",
  },
  extend: {
    boxShadow: {
      base: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
    },
  },
} as const;
