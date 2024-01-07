/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: "rgb(18, 18, 18)",
        customGray: "rgb(61,61,61)",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "100%": "100%",
        "50%": "50%",
      },
      backgroundRepeat: {
        repeat: "repeat",
        "no-repeat": "no-repeat",
      },
      fontFamily: {
        Alliance: ["signate", "sans-serif"], // Replace 'Alliance No.2 Regular' with your font-family name
      },
    },
  },
  plugins: [],
};
