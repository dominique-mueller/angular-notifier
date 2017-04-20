'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const rollup = require( 'gulp-better-rollup' );
const sourcemaps = require( 'gulp-sourcemaps' );

const rollupOptions = {
	moduleName: 'angular-notifier',
	format: 'es',
	external: [
		'@angular/core',
		'@angular/common',
		'rxjs/Subject'
	],
};
const sourcemapsOptions = {
	loadMaps: true
};

gulp.task( 'ts:bundle-fesm2015', () => {

	return gulp
		.src( 'build/temp/lib-es2015/angular-notifier.js' )
		.pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupOptions ) )
		.pipe( rename( 'angular-notifier.es2015.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

gulp.task( 'ts:bundle-fesm5', () => {

	return gulp
		.src( 'build/temp/lib-es5/angular-notifier.js' )
		.pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupOptions ) )
		.pipe( rename( 'angular-notifier.es5.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );
