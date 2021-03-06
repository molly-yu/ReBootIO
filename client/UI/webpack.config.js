const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  node : {
    __dirname: false,
    __filename: false,
  },
  externals: [
    (function () {
      var IGNORES = ['child_process','electron'];
      return function (context, request, callback){
        if(IGNORES.indexOf(request) >= 0){
          return callback(null, "require('"+ request+"')")
        }
        return callback();
      };
    })()
  ],
  plugins: [htmlPlugin]
};
