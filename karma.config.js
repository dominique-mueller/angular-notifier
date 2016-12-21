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
			require( 'karma-coverage' ),
			require( 'karma-jasmine' ),
			require( 'karma-mocha-reporter' )
		],

		// Preprocessors
		preprocessors: {
			'src/**/!(*spec).js': 'coverage'
		},

		// List of reporters, e.g. 'dots', 'progress' (see https://npmjs.org/browse/keyword/karma-reporter)
		reporters: [
			'coverage',
			'mocha'
		],

		// Test coverage settings
		coverageReporter: {
			dir : './test-coverage/js',
			reporters: [
				{
					type: 'json', // For remapping back to TypeScript
					subdir: '.',
					file: 'coverage.json'
				},
				{
					type: 'html', // For viewing in the browser
					subdir: '.' // Prevent browser-specific folder naming
				}
			]
		},

		// Web server port
		port: 9876,

		// Colors in output (repoters, logs)
		colors: true,

		// Level of logging (e.g. LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG )
		logLevel: config.INFO,

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
				pattern: 'node_modules/core-js/client/shim.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/reflect-metadata/Reflect.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/zone.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/long-stack-trace-zone.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/proxy.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/sync-test.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/jasmine-patch.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/async-test.js',
				included: true,
				watched: false
			},
			{
				pattern: 'node_modules/zone.js/dist/fake-async-test.js',
				included: true,
				watched: false
			},

			// SystemJS module loader
			{
				pattern: 'node_modules/systemjs/dist/system.src.js',
				included: true,
				watched: false
			},

			// Angular modules
			{
				pattern: 'node_modules/@angular/common/bundles/common.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/common/bundles/common-testing.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/compiler/bundles/compiler.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/core/bundles/core.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/core/bundles/core-testing.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
				included: false,
				watched: false
			},
			{
				pattern: 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
				included: false,
				watched: false
			},

			// Other libraries
			{
				pattern: 'node_modules/rxjs/**/*.js',
				included: false,
				watched: false
			},

			// Configuration files
			{
				pattern: 'demo/systemjs.config.js',
				included: true,
				watched: false
			},
			{
				pattern: 'karma-angular.config.js',
				included: true,
				watched: false
			},

			// Transpiled and original files as well as sourcemaps (source & tests)
			{
				pattern: 'src/**/*.js',
				included: false,
				watched: true // auto watch
			},
			{
				pattern: 'src/**/*.js.map',
				included: false,
				watched: false
			}

		],

		// Proxies for rewriting paths for the Karma server
		proxies: {
			'/node_modules': '/base/node_modules',
			'/src': '/base/src',
			'/demo': '/base/demo'
		},

		browserNoActivityTimeout: 1000000 // FOR DEBUGGING REASONS

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
