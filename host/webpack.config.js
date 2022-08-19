const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
        name:"Host",
        remotes:{
            Remote:`Remote@http://localhost:4000/moduleEntry.js`,

        },
        shared:{
            ...dependencies,
            react:{
                singleton:true, //there should be only one instance of react
                requiredVersion:dependencies["react"],
            },
            "react-dom":{
                singleton:true,//there should be only one instance of react-dom
                requiredVersion:dependencies["react-dom"]
            }
        }
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};