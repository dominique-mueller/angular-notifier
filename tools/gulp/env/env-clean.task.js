'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Clean build folder (with all its content)
 */
gulp.task( 'env:clean-build', () => {
	return del( [
		'build/**'
	] );
} );

/**
 * Gulp task: Clean dist folder (with all its content)
 */
gulp.task( 'env:clean-dist', () => {
	return del( [
		'dist/**'
	] );
} );
