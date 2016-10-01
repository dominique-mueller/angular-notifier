'use strict';

/**
 * Imports
 */
const gulp = require( 'gulp' );
const merge = require( 'merge2' );
const sourcemaps = require( 'gulp-sourcemaps' );
const ts = require( 'gulp-typescript' );

/**
 * Gulp task: Build TypeScript
 */
gulp.task( 'typescript:build', () => {

    // Compile TypeScript (including sourcemaps)
    let tsProject = ts.createProject( './tsconfig.json' );
    let tsResults = gulp
        .src( [
            './**/*.ts', // Select everything to keep the folder structure alive
            '!./**/*.d.ts', // Select everything to keep the folder structure alive
            '!./node_modules/**/*', // Ignore dependencies
            '!./demo/**/*', // Ignore demo
            './typings/index.d.ts' // Include typings
        ] )
        .pipe( sourcemaps.init() )
        .pipe( tsProject() );

    // Save results
    return merge( [
        tsResults.js // Compiled JavaScript files
            .pipe( sourcemaps.write( './' ) )
            .pipe( gulp.dest( './' ) ),
        tsResults.dts // Generated TypeScript definition files
            .pipe( gulp.dest( './' ) )
    ] );

} );

/**
 * Gulp task: Build TypeScript
 */
gulp.task( 'typescript:build:demo', () => {

    // Compile TypeScript (including sourcemaps)
    let tsProject = ts.createProject( './tsconfig.json' );
    let tsResults = gulp
        .src( [
            './demo/*.ts',
            './typings/index.d.ts'
        ] )
        .pipe( tsProject() );

    // Save results
    return tsResults.js // Compiled JavaScript files
        .pipe( gulp.dest( './demo/' ) );

} );
