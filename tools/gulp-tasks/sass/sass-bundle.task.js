'use strict';

const cleanCss = require( 'gulp-clean-css' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );

const cleanCssOptions = {
	advanced: true,
	aggressiveMerging: true,
	keepBreaks: false,
	keepSpecialComments: false,
	mediaMerging: true,
	restructuring: true,
	roundingPrecision: 3,
	shorthandCompacting: true
};

/**
 * Gulp task: Bundle SASS
 */
gulp.task( 'sass:bundle', () => {
	return gulp
        .src( [
            path.resolve( 'style.css' ), // Only style file
            path.resolve( 'style.css.map' ) // Only style file
        ] )
        .pipe( gulp.dest( path.resolve( 'bundles' ) ) );
} );

/**
 * Gulp task: Bundle and minify SASS
 */
gulp.task( 'sass:bundle:min', () => {
    return gulp
        .src( [
            path.resolve( 'style.css' ), // Only style file
        ] )
		.pipe( sourcemaps.init( {
			loadMaps: true // Re-use existing sourcemap
		} ) )
        .pipe( cleanCss( cleanCssOptions ) )
		.pipe( rename( 'style.min.css' ) )
		.pipe( sourcemaps.write( path.resolve( 'bundles' ) ) )
        .pipe( gulp.dest( path.resolve( 'bundles' ) ) );
} );
