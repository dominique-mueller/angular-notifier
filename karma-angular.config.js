'use strict';

// General configuration
Error.stackTraceLimit = 0; // Alternatively set to 'Infinity'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
__karma__.loaded = function() {}; // Canceles Karma's synchronous start (will be started later manually)

// Configure SystemJS
System.config( {

	// Path shortcuts
	paths: {
		'npm:': 'node_modules/'
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

// Log how many files Karma is serving (for debugging and monitoring reasons)
console.log( `[KARMA] Serving ${ Object.keys( __karma__.files ).length } files.` );

Promise

	// Import Angular testing moduels and library specs
	.all( [
		System.import( '@angular/core/testing' ),
		System.import( '@angular/platform-browser-dynamic/testing' )
	].concat(
		Object
			.keys( __karma__.files )
			.filter( ( path ) => /\.spec\.(.*\.)?js$/.test( path ) ) // Only use spec files
			.filter( ( path ) => !path.includes( 'node_modules' ) ) // Ignore spec files of dependencies
			.map( ( path ) => System
				.import( path )
				.then( ( specModule ) => {
					if ( specModule.hasOwnProperty( 'main' ) ) {
						specModule.main();
					} else {
						throw new Error( `[KARMA] Spec file "${ path }" does not implement a main() method.` );
					}
				} )
			)
	) )

	// Prepare Angular testing environment, then run Karma
	.then( ( providers ) => {
		const coreTesting = providers[ 0 ];
		const browserTesting = providers[ 1 ];
		coreTesting.TestBed.initTestEnvironment(
			browserTesting.BrowserDynamicTestingModule,
			browserTesting.platformBrowserDynamicTesting()
		);
		__karma__.start();
	} )

	// Catch errors
	.catch( ( error ) => {
		console.error( error.stack || error );
		__karma__.error();
	} );
