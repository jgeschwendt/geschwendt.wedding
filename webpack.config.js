const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    host: '0.0.0.0',
  },
  entry: {
    scripts: [
      './src/index.js',
    ],
    styles: [
      './src/index.scss'
    ]
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: "styles/[id].css",
      filename: "styles/[name].css",
      publicPath: '/assets/'
    })
  ],
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/assets/'
  }
}
