'use strict';

const del = require( 'del' );
const gulp = require( 'gulp' );
const path = require( 'path' );

/**
 * Gulp task: Clean library build
 */
gulp.task( 'env:clean--lib', () => {
    return del( [

        // JavaScript output
        path.resolve( 'index.js' ),
        path.resolve( 'src', '**', '*.js' ),

        // JavaScript sourcemaps
        path.resolve( 'index.js.map' ),
        path.resolve( 'src', '**', '*.js.map' ),

        // Generated TypeScript definitions
        path.resolve( 'index.d.ts' ),
        path.resolve( 'src', '**', '*.d.ts' ),

        // Angular AoT compiler output (metadata json files, ngfactories won't be compiled)
        path.resolve( 'index.metadata.json' ),
        path.resolve( 'src', '**', '*.metadata.json' ),

        // CSS files
        path.resolve( 'style.css' ),
        path.resolve( 'src', 'styles', '**', '*.css' ),

        // CSS sourcemaps
        path.resolve( 'style.css.map' ),
        path.resolve( 'src', 'styles', '**', '*.css.map' )

    ] );
} );

/**
 * Gulp task: Clean bundles
 */
gulp.task( 'env:clean--bundles', () => {
    return del( [
        path.resolve( 'bundles', '**' )
    ] );
} );

/**
 * Gulp task: Clean demo build
 */
gulp.task( 'env:clean--demo', () => {
    return del( [
        path.resolve( 'demo', '*.js' ),
        `!${ path.resolve( 'demo', 'systemjs.config.js' ) }`
    ] );
} );
