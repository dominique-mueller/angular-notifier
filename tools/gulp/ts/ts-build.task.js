'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const ngc = require( 'gulp-ngc' );

/**
 * Gulp task: Compile TypeScript into ES2015 JavaScript
 */
gulp.task( 'ts:build-es2015', () => {
	return ngc( 'tools/tsc/tsconfig.es2015.json' );
} );

/**
 * Gulp task: Compile TypeScript into ES5 JavaScript
 */
gulp.task( 'ts:build-es5', () => {
	return ngc( 'tools/tsc/tsconfig.es5.json' );
} );
