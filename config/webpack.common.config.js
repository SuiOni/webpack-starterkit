// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

module.exports = { 
    entry: { main: path.join(SRC_DIR, 'index.js') },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(ROOT_DIR, 'node_modules'),
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/, // tells webpack to use this loader for all ".html" files
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        
        new CleanWebpackPlugin(['dist'], { root: ROOT_DIR }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            favicon:'./src/favicon.ico',
            template: './src/index.html.ejs',
            filename: 'index.html',
            // sourceMap: false,
            // chunksSortMode: 'dependency'
        }),

    ]
};
