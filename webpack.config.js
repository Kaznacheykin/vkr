const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	entry: {
		main: './assets/js/index.js'
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: false
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: false,
							sassOptions: {
								outputStyle: "compressed",
							},
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new WebpackBundleAnalyzer()
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		webSocketServer: false,
		compress: true,
		hot: 'only',
		port: 7700,
	},
	optimization: {
		minimizer : [new CssMinimizerPlugin(), '...'],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/].*\.s?css$/,
					chunks: 'all',
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
				},
				criticalStyles: {
					name: 'critical',
					test: /critical.scss/,
					chunks: 'all',
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
				}
			},
		}
	},
};