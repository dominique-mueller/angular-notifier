'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const ngc = require( '@angular/compiler-cli/src/main' ).main;

/**
 * Gulp task: Compile TypeScript into ES2015 JavaScript
 */
gulp.task( 'ts:build-es2015', (done) => {
	ngc( ['-p', 'tools/tsc/tsconfig.es2015.json'] );
	done();
} );

/**
 * Gulp task: Compile TypeScript into ES5 JavaScript
 */
gulp.task( 'ts:build-es5', (done) => {
	ngc( ['-p','tools/tsc/tsconfig.es5.json'] );
	done();
} );
