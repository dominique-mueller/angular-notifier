'use strict';

/**
 * Imports
 */
const del = require( 'del' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Clean build files
 */
gulp.task( 'environment:clean', () => {
    return del( [
        './index.js',
        './index.js.map',
        './index.d.ts',
        './src/**/*.js',
        './src/**/*.js.map',
        './src/**/*.d.ts',
        './style.css',
        './src/styles/**/*.css'
    ] );
} );

/**
 * Gulp task: Clean build files (demo)
 */
gulp.task( 'environment:clean:demo', () => {
    return del( [
        './demo/*.js',
        '!./demo/systemjs.config.js'
    ] );
} );
