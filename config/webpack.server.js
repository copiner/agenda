// 服务端webpack打包入口
const Webpack = require('webpack');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
let path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    externals:[nodeExternals()],
    entry: './src/server/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist/server/')
    },
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
                  exclude: /node_modules/,
                  use: [
                      {
                          loader: 'css-loader',
                          options: {
                              modules: true
                          }
                      },
                      {   loader: 'postcss-loader' }
                  ]
              }
          ]
    },
    plugins: [
  //    new MiniCssExtractPlugin(),
      new Webpack.DefinePlugin({
          '__isServer': true,
          '__isDev':true
      }),
      new Webpack.HotModuleReplacementPlugin()
    ]
}
