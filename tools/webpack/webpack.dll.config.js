'use strict';

const path = require( 'path' );

const ContextReplacementPlugin = require( 'webpack/lib/ContextReplacementPlugin' );
const DllPlugin = require( 'webpack/lib/DllPlugin' );
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

/**
 * Webpack Configuration for the Vendor Bundle
 */
module.exports = {

	devtool: 'source-map',

	// Entry files
	entry: {

		// External libraries
		vendor: [
			'@angular/core',
			'@angular/common',
			'@angular/compiler',
			'@angular/platform-browser',
			'@angular/platform-browser-dynamic',
			'rxjs'
		],

		polyfills: [
            'core-js',
            'zone.js',
			'web-animations-js'
        ],

	},

	// Output files
	output: {
		path: path.resolve( process.cwd(), 'build', 'dll' ),
		filename: '[name].dll.js',
		library: '[name]_[hash]' // Global variable name
	},

	// Plugins
	plugins: [

		// Fix Angular-specific warnings
		// For details, see <https://github.com/angular/angular/issues/11580>
		new ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve( process.cwd(), 'src' ),
			{}
		),

		new DllPlugin( {
			path: path.resolve( process.cwd(), 'build', 'dll', '[name]-manifest.json' ),
			name: '[name]_[hash]' // Global variable name (same as above)
		} ),

		new SimpleProgressWebpackPlugin( {
			format: 'minimal'
		} )

	],

	stats: {
		assets: true,
		cached: false,
		children: false,
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		colors: true,
		errors: true,
		errorDetails: true,
		hash: false,
		modules: false,
		publicPath: false,
		reasons: false,
		source: false,
		timings: false,
		version: false,
		warnings: true
	}

};
