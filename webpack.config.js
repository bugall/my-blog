'use strick'
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = [
    'dist',
];
const cleanOptions = {
    root: __dirname,
    exclude: ['*.js'],
    verbose: true,
    dry: false
};
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const path = require('path');
module.exports = {
	entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/index.js'],
	//entry: ['react-hot-loader/patch', './client/index.js'],
	output: {
        path: __dirname + '/dist',
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
	},
	module: {
		loaders: [{
            test: /\.scss$/,
            //loader: 'style-loader!css-loader?modules!sass-loader',
            //use: extractSass.extract({
            //    // use style-loader in development
            //    fallback: "style-loader"
            //}),
            loader: 'style-loader!css-loader?modules!sass-loader'            
            //loader: lessLoader
        },{
			test: /\.(js|jsx)/,
			exclude: /node_modules/,
			loader: 'babel-loader'
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)/,
            loader: 'url-loader?limit=100000'
        }]
    },
    resolve: { 
    },
    plugins: [new HtmlWebpackPlugin({
        template: `ejs-render-loader!${__dirname}/template.html`,
        inject: 'body',
        filename: __dirname + '/dist/index.html',
    }), new CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity
    }), new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //extractSass],
    ],
    devtool: "source-map"
}
