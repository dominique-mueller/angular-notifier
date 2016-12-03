'use strict';

const gulp = require( 'gulp' );
const karma = require( 'karma' );
const path = require( 'path' );

/**
 * Gulp task: Run TypeScript unit tests
 */
gulp.task( 'ts:spec', ( done ) => {
	new karma.Server( {
		configFile: path.resolve( 'karma.config.js' ), // Absolute path necessary
		singleRun: true, // Overwrite
		autoWatch: false // Overwrite
	}, done ).start();
} );
