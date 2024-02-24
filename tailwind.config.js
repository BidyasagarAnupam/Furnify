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
        red: "#ED2939",
        yellow: "#FFAB00",
        green: "#38CB89",
        blue: "#377DFF",
        purple: "#926BA8",
        cream: "#F6D2C8",
        brown: "#3C2D24",
        darkgreen: "#296f6c"

      },
      neutral: {
        1: "#FEFEFE",
        2: "#F3F5F7",
        3: "#E8ECEF",
        4: "#6C7275",
        5: "#343839",
        6: "#232627",
        7: "#141718",
        8: "#F5F5F5",
        9: "#C2C2C2",
        10: "#F2F5F7",
        11: "#858585"
      },
      'richBlue': {
        '50': '#ecffff',
        '100': '#ceffff',
        '200': '#a4fbfd',
        '300': '#5bf5fb',
        '400': '#1fe6f1',
        '500': '#03c9d7',
        '600': '#05a1b5',
        '700': '#0c8092',
        '800': '#146776',
        '900': '#155564',
        '950': '#073845',
      },

    },
    extend: {
      backgroundImage: {
        'hero-section': "url('assets/Hero-section.png')"
      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
  },
  plugins: [],
};