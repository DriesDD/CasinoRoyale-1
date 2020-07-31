module.exports = {
  purge: {
    enabled: false,
    content: ['index.html', './game-one/game-one.html', './game-one/js-one.js', './game-two/game-two.html', './game-three/game-three.html', './game-four/game-four.html', ]
  },
  theme: {
    extend: {
      colors: {
        body: '#FBD38D',
        banner: '#9B2C2C',
        orange: '#F6AD55',
        sunshine: '#FBD38D',
        wild: '#FBD38D',
        gold: '#C08E54',
        classy: '#000000',
      },
    },
  },
  variants: {},
  plugins: [],
}