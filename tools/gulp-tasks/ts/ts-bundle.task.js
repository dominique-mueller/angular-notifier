'use strict';

const gulp = require( 'gulp' );
const path = require( 'path' );
const gutil = require( 'gulp-util' );
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require( 'webpack' );

/**
 * Gulp task: Bundle TypeScript as UMD
 */
gulp.task( 'ts:bundle:umd', ( done ) => {

    webpack( {
		devtool: 'source-map',
		entry: path.resolve( 'index.js' ),
		output: {
			path: path.resolve( 'bundles' ),
			filename: 'angular-notifier.umd.js',
			library: 'angular-notifier',
			libraryTarget: 'umd',
			sourceMapFilename: 'angular-notifier.umd.map.js'
		},
		resolve: {
			modules: [
				path.resolve( 'node_modules' )
			],
			extensions: [
				'.js'
			]
		},
		externals: [ // Don't bundle up external dependencies (here Angular modules and rxjs)
			/^\@angular\//,
			/^rxjs\//
		],
		target: 'web',
		module: {
			rules: [
				{ // Re-use existing sourcemaps
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader'
				}
			]
		},
		plugins: [
			new ProgressBarPlugin()
		]
	}, ( error, stats ) => {

		if ( error ) {
			new gutil.PluginError( {
				plugin: 'webpack',
				message: `Webpack error.\n${ error }`
			} );
		} else {
			gutil.log( stats.toString( {
				colors: true,
				chunks: false
			} ) );
			done();
		}

	} );

} );

/**
 * Gulp task: Bundle and minify TypeScript as UMD
 */
gulp.task( 'ts:bundle:umd:min', ( done ) => {

    webpack( {
		devtool: 'source-map',
		entry: path.resolve( 'index.js' ),
		output: {
			path: path.resolve( 'bundles' ),
			filename: 'angular-notifier.umd.min.js',
			library: 'angular-notifier',
			libraryTarget: 'umd',
			sourceMapFilename: 'angular-notifier.umd.min.map.js'
		},
		resolve: {
			modules: [
				path.resolve( 'node_modules' )
			],
			extensions: [
				'.js'
			]
		},
		externals: [ // Don't bundle up external dependencies (here Angular modules and rxjs)
			/^\@angular\//,
			/^rxjs\//
		],
		target: 'web',
		module: {
			rules: [
				{ // Re-use existing sourcemaps
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader'
				}
			]
		},
		plugins: [
			new ProgressBarPlugin(),
			new webpack.optimize.UglifyJsPlugin( {
				compress: {
					booleans: true,
					cascade: true,
					collapse_vars: false,
					comparisons: true,
					conditionals: true,
					dead_code: true,
					drop_console: true,
					drop_debugger: true,
					evaluate: true,
					hoist_funs: true,
					hoist_vars: false,
					if_return: true,
					join_vars: true,
					keep_fargs: false,
					keep_fnames: false,
					loops: true,
					negate_iife: false, // (#perfmatters)
					passes: 1,
					properties: true,
					pure_funcs: null,
					pure_getters: true,
					sequences: true,
					unsafe: true,
					unsafe_comps: false,
					unused: true,
					warnings: false // Enable for debugging
				},
				mangle: {
					toplevel: true,
					keep_fnames: false
				},
				sourceMap: true
			} )
		]
	}, ( error, stats ) => {

		if ( error ) {
			new gutil.PluginError( {
				plugin: 'webpack',
				message: `Webpack error.\n${ error }`
			} );
		} else {
			gutil.log( stats.toString( {
				colors: true,
				chunks: false
			} ) );
			done();
		}

	} );

} );
