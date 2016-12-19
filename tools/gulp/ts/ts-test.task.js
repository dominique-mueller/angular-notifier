'use strict';

const gulp = require( 'gulp' );
const karma = require( 'karma' );
const path = require( 'path' );
const remapIstanbul = require( 'remap-istanbul/lib/gulpRemapIstanbul' ).default;

/**
 * Gulp task: Run TypeScript unit tests
 */
gulp.task( 'ts:test--spec', ( done ) => {

	new karma.Server( {
		configFile: path.resolve( 'karma.config.js' ), // Absolute path necessary
		singleRun: true, // Overwrite
		autoWatch: false // Overwrite
	}, done ).start();

} );

/**
 * Gulp task: Generate test coverage for TypeScript files
 */
gulp.task( 'ts:test--coverage', () => {

	return gulp
		.src( 'test-coverage/js/coverage.json' )
		.pipe( remapIstanbul( {
			reports: {
				'json': 'test-coverage/ts/coverage.json',
				'html': 'test-coverage/ts/', // For viewing in the browser
				'text-summary': null // Print coverage summary to the console
			}
		} ) );

} );
