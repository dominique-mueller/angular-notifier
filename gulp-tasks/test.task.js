'use strict';

const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const karma = require( 'karma' );

/**
 * Gulp task: Check that all gulp files are (at least semantically) correct, and that files can be found
 */
gulp.task( 'test:gulp', ( done ) => {
    gutil.log( 'All Gulp tasks seem to be fine.' ); // If we reach this task, everything's fine
    done();
} );

/**
 * Gulp task: Run unit tests (jasmine testing framework, karma test runner)
 */
gulp.task( 'test:spec', ( done ) => {
	new karma.Server( {
		configFile: `${ __dirname }/../karma.config.js`,
		singleRun: true, // Overwrite
		autoWatch: false // Overwrite
	}, done ).start();
} );

/**
 * Gulp task: Run all tests
 */
gulp.task( 'test', gulp.parallel( [
    'test:gulp',
    'test:spec'
] ) );
