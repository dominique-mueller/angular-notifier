'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );

/**
 * Gulp task: Build SASS for development
 */
gulp.task( 'sass:build--dev', () => {
    return gulp
        .src( [
            'style.scss', // Only root style file
        ] )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( '.' ) ) // Relative path
        .pipe( gulp.dest( '.' ) );
} );

/**
 * Gulp task: Build SASS for publishment
 */
gulp.task( 'sass:build--publish', () => {
    return gulp
        .src( [
            '**/*.scss', // Keep the file structure
            '!node_modules/**', // Ignore dependencies
            '!demo/**' // Ignore demo
        ] )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( '.' ) ) // Relative path
        .pipe( gulp.dest( '.' ) );
} );
