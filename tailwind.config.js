/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      primary: "#000000",
      transparent: "#ffffff00",
      secondary: {
        red: "#FF5630",
        yellow:"#FFAB00",
        green: "#38CB89",
        blue:"#377DFF",
      },
      neutral : {
        1: "#FEFEFE",
        2: "#F3F5F7",
        3: "#E8ECEF",
        4: "#6C7275",
        5: "#343839",
        6: "#232627",
        7: "#141718"
      }
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
  },
  plugins: [],
};