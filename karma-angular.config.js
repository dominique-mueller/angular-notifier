'use strict';

// General configuration
Error.stackTraceLimit = 0; // Alternatively set to 'Infinity'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
__karma__.loaded = function() {}; // Canceles Karma's synchronous start (will be started later manually)

// Configure SystemJS
System.config( {

	// Path shortcuts
	paths: {
		'npm:': './node_modules/'
	},

	// Package location details
	map: {
		'@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
		'@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
		'@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
		'@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
		'@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js'
	},

	// Package loading details
	packages: {
		'testing': {
			main: 'index.js',
			defaultExtension: 'js'
		}
	}

} );

// Get the spec files only
const specFiles = Object
	.keys( __karma__.files )
	.filter( ( path ) => /\.spec\.(.*\.)?js$/.test( path ) );

// Import SystemJS configuration from demo
System.import( './base/demo/systemjs.config.js' )
	.then( () => {

		// Import modules and spec files, initialize testing, run Karma
		Promise
			.all( [
				System.import( '@angular/core/testing' ),
				System.import( '@angular/platform-browser-dynamic/testing' ),
				specFiles.map( ( moduleName ) => System.import( moduleName ) )
			] )
			.then( function( providers ) {
				const coreTesting = providers[ 0 ];
				const browserTesting = providers[ 1 ];
				coreTesting.TestBed.initTestEnvironment(
					browserTesting.BrowserDynamicTestingModule,
					browserTesting.platformBrowserDynamicTesting()
				);
				__karma__.start();
			} );

	} )
	.catch( __karma__.error );
