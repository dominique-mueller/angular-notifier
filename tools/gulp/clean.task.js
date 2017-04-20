'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );

gulp.task( 'clean:build-temp', () => {
	return del( [
		'build/temp/**'
	] );
} );

gulp.task( 'clean:build-bundles', () => {
	return del( [
		'build/bundles/**'
	] );
} );
