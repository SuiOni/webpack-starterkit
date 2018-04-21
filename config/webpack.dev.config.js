//https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
//const ASSETS_DIR = path.resolve(ROOT_DIR, 'assets');

devConfig= {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: DIST_DIR,
        hot: true,
        port: 9000,
        watchOptions: {
            poll: 1000
        },
        stats: {
            children: false
        }
    },
    output: {
        path: DIST_DIR,
        filename: 'main.js'
    },
    module: {
        rules: [

            // css
            // {
            //     test: /\.css$/,
            //     include: /node_modules/,
            //     loader: [
            //         'style-loader',
            //         'css-loader',
            //     ]
            // },     
            // sass
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    //MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js'),
                            },
                            // plugins() {
                            //     return [autoprefixer('last 2 version')];
                            // }
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            // includePaths: [ASSETS_DIR]

                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // }),
        new ProgressBarPlugin({
            format: 'Build [:bar] :percent (:elapsed seconds)',
            clear: false,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]    
};
console.log(JSON.stringify(merge(common, devConfig)));
module.exports = merge(common, devConfig);