/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    darkTheme: "lemonade",
    themes: ["light", "dark", "black", "lemonade"],
  },
  plugins: [require("daisyui")],
};
