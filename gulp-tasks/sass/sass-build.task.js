'use strict';

/**
 * Imports
 */
const autoprefixer = require( 'gulp-autoprefixer' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );

/**
 * Gulp task: Build SASS
 */
gulp.task( 'sass:build', () => {
    return gulp
        .src( [
            './**/*.scss', // Keep file structure
            '!./node_modules/**/*', // Ignore dependencies
            '!./demo/**/*' // Ignore demo
        ] )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded'
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( gulp.dest( './' ) );
} );
