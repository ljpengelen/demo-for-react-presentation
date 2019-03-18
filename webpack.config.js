const path = require("path");
const webpack = require("webpack");
const babelConfig = require("./config/babel");

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";

process.stderr.write(`Building with env = ${env}\n`);

const getGitRevision = function() {
  return process.env.GIT_COMMIT || "untracked";
};

const getNpmVersion = function() {
  return require("./package.json").version;
};

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTML = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const TimeFixPlugin = require("time-fix-plugin");

const plugins = [
  new ForkTsCheckerWebpackPlugin(),
  new HTML({
    template: "src/index.html"
  }),
  new webpack.DefinePlugin({
    "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
    "process.env.NODE_ENV": JSON.stringify(env),
    __BUILD_IDENTIFIER__: JSON.stringify(getGitRevision()),
    __VERSION_NUMBER__: JSON.stringify(getNpmVersion())
  }),
  new SpriteLoaderPlugin(),
  new TimeFixPlugin(20000)
];

const Clean = require("clean-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");

if (isProd) {
  plugins.push(
    new Clean(),
    new MiniCssExtract({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

if (process.env.ANALYZE_BUNDLE === "true") {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

  plugins.push(new BundleAnalyzerPlugin());
}

const entryPoints = function() {
  const items = isProd
    ? []
    : ["webpack-hot-middleware/client?noInfo=true&reload=true"];
  items.push(...arguments);
  return items;
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer"), require("cssnano")]
  }
};

const resolveTsconfigPathsToAlias = ({
  tsconfigPath = "./tsconfig.json",
  webpackConfigBasePath = "./"
} = {}) => {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = Object.keys(paths).reduce((acc, curr) => {
    const key = curr.replace("/*", "");
    const value = path.resolve(
      webpackConfigBasePath,
      paths[curr][0].replace("/*", "")
    );

    acc[key] = value;
    return acc;
  }, {});

  return aliases;
};

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    app: entryPoints("./src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd ? "[name].[chunkhash].js" : "[name].[hash].js",
    publicPath: "./"
  },
  optimization: {
    minimize: isProd,
    namedModules: !isProd,
    noEmitOnErrors: !isProd,
    splitChunks: isProd && {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /.*/,
        include: path.resolve(__dirname, "src/assets"),
        exclude: path.resolve(__dirname, "src/assets/icons"),
        options: {
          name: "[name]-[hash].[ext]"
        },
        loader: "file-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelConfig
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelConfig
      },
      { test: /\.yml$/, loader: "json-loader!yaml-loader" },
      {
        test: /\.scss$/,
        exclude: /shell.scss$/,
        use: [
          isProd ? MiniCssExtract.loader : "style-loader",
          isProd
            ? "css-loader?modules"
            : {
                loader: "css-loader",
                options: {
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  modules: true
                }
              },
          postcssLoader,
          "sass-loader"
        ]
      },
      {
        test: /shell.scss$/,
        use: [
          isProd ? MiniCssExtract.loader : "style-loader",
          "css-loader",
          postcssLoader,
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "src/assets/icons"),
        loader: "svg-sprite-loader"
      }
    ]
  },
  resolve: {
    alias: resolveTsconfigPathsToAlias(),
    extensions: [".js", ".ts", ".tsx"],
    symlinks: false
  },
  devtool: isProd ? undefined : "eval",
  plugins
};
