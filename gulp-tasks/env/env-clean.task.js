'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Clean project build files
 */
gulp.task( 'env:clean', () => {
    return del( [
        './index.js', // Generated JavaScript, sourcemaps, and TypeScript definition files ...
        './index.js.map',
        './index.d.ts',
        './src/**/*.js',
        './src/**/*.js.map',
        './src/**/*.d.ts',
        './style.css', // ... and CSS files
        './src/styles/**/*.css'
    ] );
} );

/**
 * Gulp task: Clean demo build files
 */
gulp.task( 'env:clean--demo', () => {
    return del( [
        './demo/*.js',
        '!./demo/systemjs.config.js'
    ] );
} );
