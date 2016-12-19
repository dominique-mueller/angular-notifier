'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Clean library build
 */
gulp.task( 'env:clean--lib', () => {
    return del( [

        // JavaScript output
        'index.js',
        'src/**/*.js',

        // JavaScript sourcemaps
        'index.js.map',
        'src/**/*.js.map',

        // Generated TypeScript definitions
        'index.d.ts',
        'src/**/*.d.ts',

        // Angular AoT compiler output (metadata json files, ngfactories won't be compiled)
        'index.metadata.json',
        'src/**/*.metadata.json',

        // CSS files
        'style.css',
        'src/styles/**/*.css',

        // CSS sourcemaps
        'style.css.map',
        'src/styles/**/*.css.map'

    ] );
} );

/**
 * Gulp task: Clean bundles
 */
gulp.task( 'env:clean--bundles', () => {
    return del( [
        'bundles/**'
    ] );
} );

/**
 * Gulp task: Clean demo build
 */
gulp.task( 'env:clean--demo', () => {
    return del( [
        'demo/*.js',
        '!demo/systemjs.config.js'
    ] );
} );

/**
 * gulp task: Clean test coverage
 */
gulp.task( 'env:clean--coverage', () => {
    return del( [
        'test-coverage'
    ] );
} );
