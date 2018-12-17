const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin= require('webpack-cleanup-plugin');


var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'index.js')
  ],
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module : {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'stage-2']
        }
      },
      {
        test: /\.css?/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,

    proxy: {
      '/api': {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Gamepal',
      template: 'src/static/index.html'
    })
  ],
  node: {
    dns: 'mock',
    net: 'mock'
  }
};

module.exports = config;
