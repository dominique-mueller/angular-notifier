'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const rollup = require( 'gulp-rollup' );
const sourcemaps = require( 'gulp-sourcemaps' );

const rollupFesm2015Options = require( './../../rollup/rollup.fesm2015.config' );
const rollupFesm5Options = require( './../../rollup/rollup.fesm5.config' );
const rollupUmdOptions = require( './../../rollup/rollup.umd.config' );
const sourcemapsOptions = {
	loadMaps: true
};

gulp.task( 'ts:bundle-fesm2015', () => {

	return gulp
		.src( 'build/temp/lib-es2015/**/*.js' )
		.pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupFesm2015Options ) )
		.pipe( rename( 'angular-notifier.es2015.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

gulp.task( 'ts:bundle-fesm5', () => {

	return gulp
		.src( 'build/temp/lib-es5/**/*.js' )
		.pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupFesm5Options ) )
		.pipe( rename( 'angular-notifier.es5.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

gulp.task( 'ts:bundle-umd', () => {

	return gulp
		.src( 'build/temp/lib-es5/**/*.js' )
		.pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupUmdOptions ) )
		.pipe( rename( 'angular-notifier.umd.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );
