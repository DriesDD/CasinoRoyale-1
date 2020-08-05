module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    /* require('@fullhuman/postcss-purgecss')({
      content: [
        './index.html', //Add all html files that use tailwind here
        './other.html',
      ],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }), */
  ],
};
