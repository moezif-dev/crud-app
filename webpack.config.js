const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'main.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use:{
				loader: 'babel-loader',
				options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true,
        }
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			// load a custom HTML template
			template: './client/index.html',
		}),
	]
}