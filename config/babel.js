const supportedBrowsers = require("./supported-browsers");

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  ["@babel/plugin-proposal-class-properties", { loose: false }],
  "@babel/plugin-proposal-json-strings",
  "@babel/transform-react-jsx"
];

if (process.env.NODE_ENV === "test") {
  plugins.push(["istanbul", { exclude: "test" }]);
}

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: supportedBrowsers
        },
        loose: true,
        modules: false,
        useBuiltIns: "entry"
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins
};
