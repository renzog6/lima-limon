/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    darkTheme: "lemonade",
    themes: [
      {
        mytheme: {
          primary: "#E0A82E",
          secondary: "#F9D72F",
          accent: "#181830",
          neutral: "#181830",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      "light",
      "dark",
      "forest",
      "black",
      "dracula",
      "lemonade",
    ],
  },
  plugins: [require("daisyui")],
};
