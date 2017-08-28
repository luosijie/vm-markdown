var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/components/vm-markdown.vue',
  output: {
    path: path.resolve(__dirname, './publish'),
    // publicPath: '/dist/',
    filename: 'vm_markdown.min.js',
    library: 'vm-markdown',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: './images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|svg|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: './iconfont/[name].[ext]?[hash]'
        }
      }
    ]
  }
}
