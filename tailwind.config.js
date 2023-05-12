/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },

    extend: {
      /*
        backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 60% 40%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
      },
    */
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8b98d6",
          secondary: "#d2ed93",
          accent: "#fcf2a4",
          neutral: "#17161D",
          "base-100": "#273549",
          info: "#2D93D2",
          success: "#1E9960",
          warning: "#AA900E",
          error: "#EF3E6D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
