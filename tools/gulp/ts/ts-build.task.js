'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const ngc = require( 'gulp-ngc' );

gulp.task( 'ts:build-es2015', () => {
	return ngc( 'tools/tsc/tsconfig.es2015.json' );
} );

gulp.task( 'ts:build-es5', () => {
	return ngc( 'tools/tsc/tsconfig.es5.json' );
} );
