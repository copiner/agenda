// 客户端webpack打包入口
const Webpack = require('webpack');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, '../dist')
    },
    devtool: 'eval-source-map',
    module: {
    rules: [
          {
              test: /\.tsx|.ts$/,
              exclude: /node_modules/,
              use: {
                  loader: "ts-loader"
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
                          //modules: true
                      }
                  },
                  {   loader: 'postcss-loader' }
              ]
          },
          {
            test: /\.(flac)$/i,
            use: [
              {
                loader: 'file-loader',
              }
            ],
          },
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.tsx','.ts'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebpackPlugin({
          title: 'qinaqian',
          template:'./public/index.html',
          filename: "index.html",
          favicon: "./public/favicon.ico"
        }),
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      static: path.resolve(__dirname, "../dist"),
      host:"127.0.0.1",
      port: 9000,
      proxy: {
         '/api': {
           target: "",
           changeOrigin:true,
           pathRewrite: {'^/api' : ''}
         }
       }
    }
}
