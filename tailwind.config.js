module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        primary: {
          100: "#cccccc",
          600: "#CC0033",
        },
        secondary: {
          500: "#99CC99",
        },
        tertiary: {
          800: "#333333",
          300: "#595959",
        },
      },
      aspectRatio: {
        square: [1, 1],
        "21/9": [21, 9],
        "16/9": [16, 9],
        "4/3": [4, 3],
        "3/2": [3, 2],
        "4/5": [4, 5],
        "1/2": [1, 2],
      },
      height: {
        "70vh": "70vh",
        "50vh": "50vh",
      },
      maxHeight: {
        "50vh": "50vh",
      },
      minWidth: {
        "600px": "600px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      textColor: ["group-hover"],
    },
  },
  plugins: [require("tailwindcss-aspect-ratio")],
};
