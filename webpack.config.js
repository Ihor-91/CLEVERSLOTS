const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const autoprefixer = require("autoprefixer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isProd ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/about_us.html"),
      filename: "about_us.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/privacy_policy.html"),
      filename: "privacy_policy.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/wolf_gold_game.html"),
      filename: "wolf_gold_game.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/the_dog_house.html"),
      filename: "the_dog_house.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/gates_of_olympus.html"),
      filename: "gates_of_olympus.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/wild_west_gold.html"),
      filename: "wild_west_gold.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/big_bass_bonanaza.html"),
      filename: "big_bass_bonanaza.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/buffalo_king.html"),
      filename: "buffalo_king.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/chilli_heat.html"),
      filename: "chilli_heat.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/fortune_of_giza.html"),
      filename: "fortune_of_giza.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/rainbow_gold.html"),
      filename: "rainbow_gold.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/contact_us.html"),
      filename: "contact_us.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "app/assets"),
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: "./assets/favicons/android-chrome-144x144.png",
      mode: "webapp",
      devMode: "webapp",
      favicons: {
        appName: "Cleverslots",
        appDescription: "Best online slots at this social online casino",
        developerName: "Ihor",
        background: "#ffffff",
        theme_color: "#ffffff",
      },
    }),
  ];

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./js/main.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "app"),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: false,
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        type: "asset/resource",
        generator: {
          filename: isDev ? "img/[hash][ext][query]" : "img/[name][ext][query]",
        },
      },
      {
        test: /\.(?:|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: isDev
            ? "fonts/[hash][ext][query]"
            : "fonts/[name][ext][query]",
        },
      },
    ],
  },
};
