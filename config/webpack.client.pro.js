// 客户端webpack打包入口
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
let path = require('path');


module.exports = {
    target: 'web',
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: './js/[name].[contenthash].js',
      chunkFilename: './js/[name].[contenthash].js',
      path: path.resolve(__dirname, '../dist/client/')
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
                          loader: MiniCssExtractPlugin.loader
                      },
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'libs'
          }
        }
      }
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'main-[contentHash:10].css'
        }),
        new Webpack.DefinePlugin({
            '__isServer': false,
            '__isDev': false
        }),
        new WebpackManifestPlugin({
            fileName: '../mainfest.json',
            filter: ({ name }) => {
                const ext = name.slice(name.lastIndexOf('.'));
                return ext === '.js' || ext === '.css';
            }
        }),
    ]
}
