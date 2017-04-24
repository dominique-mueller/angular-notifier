'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );

/**
 * Gulp task: Build SASS
 */
gulp.task( 'sass:build', () => {
    return gulp
        .src( [
            'src/lib/**/*.scss'
        ] )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( '.' ) ) // Relative path
        .pipe( gulp.dest( 'build/library-styles' ) );
} );
