'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );

/**
 * Gulp task: Build project SASS for development
 */
gulp.task( 'sass:build--dev', () => {
    return gulp
        .src( [
            './style.scss', // Only style file
        ] )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() ) // Optional, could be removed for dev
        .pipe( gulp.dest( './' ) );
} );

/**
 * Gulp task: Build project SASS for production
 */
gulp.task( 'sass:build--prod', () => {
    return gulp
        .src( [
            './**/*.scss', // Keep file structure
            '!./node_modules/**', // Ignore dependencies
            '!./demo/**' // Ignore demo
        ] )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( gulp.dest( './' ) );
} );
