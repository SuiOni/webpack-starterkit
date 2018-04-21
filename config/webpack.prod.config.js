//https://thebrainfiles.wearebrain.com/moving-from-webpack-3-to-webpack-4-f8cdacd290f9
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    //filename: `[name]${argv.mode === 'development' ? '' : '[chunkhash:8]'}.js`
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      // sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                // plugins: [autoprefixer('last 2 version')],
                config: {
                  path: path.resolve(__dirname, './postcss.config.js'),
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})

    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].[hash].css',
    //   chunkFilename: '[id].[hash].css',
    // })
    // new MiniCssExtractPlugin({
    //   filename: `style.${argv.mode === 'development' ? '' : '[contenthash]'}.css`,
    // }),
    //new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: false,
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new OfflinePlugin({
      caches: 'all',
      AppCache: false,
      ServiceWorker: {
        minify: false,
      },
    }),
  ],
};

// if (process.env.NODE_ANALYZE) {
//   prodConfig.plugins.push(new BundleAnalyzerPlugin());
// }
module.exports = merge(common, prodConfig);


