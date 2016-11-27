'use strict';

const autoprefixer = require( 'gulp-autoprefixer' );
const gulp = require( 'gulp' );
const path = require( 'path' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );

/**
 * Gulp task: Build SASS for development
 */
gulp.task( 'sass:build--dev', () => {
    return gulp
        .src( [
            path.resolve( 'style.scss' ), // Only style file
        ] )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( path.resolve( '.' ) ) )
        .pipe( gulp.dest( path.resolve( '.' ) ) );
} );

/**
 * Gulp task: Build SASS for publishment
 */
gulp.task( 'sass:build--publish', () => {
    return gulp
        .src( [
            path.resolve( '**', '*.scss' ), // Keep the whole file structure
            `!${ path.resolve( 'node_modules', '**' ) }`, // Ignore dependencies
            `!${ path.resolve( 'demo', '**' ) }` // Ignore demo
        ] )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            'errLogToConsole': true,
            'outputStyle': 'expanded' // No minifying
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( path.resolve( '.' ) ) )
        .pipe( gulp.dest( path.resolve( '.' ) ) );
} );
