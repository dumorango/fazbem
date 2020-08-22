module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Gochi Hand"],
      sans: ["Martel"],
    },
    extend: {
      colors: {
        "accent-1": "#333",
        green: "#4e5f28",
      },
    },
  },
  variants: {},
  plugins: [],
};
