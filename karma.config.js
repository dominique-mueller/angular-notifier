'use strict';

// Karma configuration
module.exports = function( config ) {

	// General options
	let options = {

		// Base path for resolving patterns
		basePath: './',

		// List of used frameworks (see https://npmjs.org/browse/keyword/karma-adapter)
		frameworks: [
			'jasmine'
		],

		// List of used plugins
		plugins: [
			require( 'karma-chrome-launcher' ),
			require( 'karma-jasmine' ),
			require( 'karma-mocha-reporter' )
		],

		// List of reporters, e.g. 'dots', 'progress' (see https://npmjs.org/browse/keyword/karma-reporter)
		reporters: [
			'mocha'
		],

		// Web server port
		port: 9876,

		// Colors in output (repoters, logs)
		colors: true,

		// Level of logging (e.g. LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG )
		logLevel: config.DEBUG,

		// Watcher
		autoWatch: true,

		// CI mode (runs and exits)
		singleRun: false,

		// Browsers to run the tests in (see https://npmjs.org/browse/keyword/karma-launcher)
		browsers: [
			'Chrome'
		],

		// Custom browsers (here for CI)
		customLaunchers: {
			Chrome_CI: {
				base: 'Chrome',
				flags: [
					'--no-sandbox'
				]
			}
		},

		// Files (order matters, else alphabetically)
		files: [

			// Polyfills (always first)
			{
				pattern: './node_modules/core-js/client/shim.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/reflect-metadata/Reflect.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/zone.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/long-stack-trace-zone.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/proxy.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/sync-test.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/jasmine-patch.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/async-test.js',
				included: true,
				watched: false
			},
			{
				pattern: './node_modules/zone.js/dist/fake-async-test.js',
				included: true,
				watched: false
			},

			// SystemJS module loader
			{
				pattern: './node_modules/systemjs/dist/system.src.js',
				included: true,
				watched: false
			},

			// Framework & libraries
			{
				pattern: './node_modules/@angular/**/*.js',
				included: false,
				watched: false
			},
			{
				pattern: './node_modules/@angular/**/*.js.map',
				included: false,
				watched: false
			},
			{
				pattern: './node_modules/rxjs/**/*.js',
				included: false,
				watched: false
			},
			{
				pattern: './node_modules/rxjs/**/*.js.map',
				included: false,
				watched: false
			},

			// Configuration files
			{
				pattern: './demo/systemjs.config.js',
				included: true,
				watched: false
			},
			{
				pattern: './karma-angular.config.js',
				included: true,
				watched: false
			},

			// Transpiled and original files as well as sourcemaps (source & tests)
			{
				pattern: './src/**/*.js',
				included: false,
				watched: true // auto watch
			},
			{
				pattern: './src/**/*.ts',
				included: false,
				watched: false
			},
			{
				pattern: './src/**/*.js.map',
				included: false,
				watched: false
			}

		],

		// Proxies for rewriting paths for the Karma server
		proxies: {
			'/node_modules': '/base/node_modules',
			'/src': '/base/src',
			'/demo': '/base/demo'
		}

	};

	// Special configuration for Travis CI
	if ( process.env.TRAVIS ) {
		options.browsers = [
			'Chrome_CI'
		];
		options.singleRun = true;
		options.autoWatch = false;
		options.browserNoActivityTimeout = 90000;
	}

	// Configure
	config.set( options );

}
