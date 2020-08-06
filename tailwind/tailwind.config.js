const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: false,
    content: [
      "index.html",
      "./game-one/game-one.html",
      "./game-one/js-one.js",
      "./game-two/game-two.html",
      "./game-three/game-three.html",
      "./game-four/game-four.html",
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        titlefont: ["professor-minty"],
       //navfont: ["myriad-std-tilt"],
        navfont: ["Rubik"],
      },
    },


}

  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
};
