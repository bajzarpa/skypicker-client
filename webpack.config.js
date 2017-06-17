const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.ENV = process.env.NODE_ENV === 'build';
const path = require('path');

module.exports = function makeWebpackConfig() {

  const config = {};

  config.entry = [
    'babel-polyfill',
    './client/app/app.js'
  ];

  config.output = {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.devtool = isProd ? 'eval' : 'source-map';

  config.module = {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.js$/,
        loader: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  };

  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/i,
      options: {}
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      '__PROCESS__': {
        'ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'body'
    })
  ];


  if (isProd) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  } else {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }

  config.resolve = {
    extensions: ['.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client/app')
    ]
  };

  config.devServer = {
    contentBase: __dirname + '/client',
    stats: 'minimal',
    hot: true
  };
  return config;
}();
