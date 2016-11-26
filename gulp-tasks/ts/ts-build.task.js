'use strict';

const gulp = require( 'gulp' );
const merge = require( 'merge2' );
const sourcemaps = require( 'gulp-sourcemaps' );
const ts = require( 'gulp-typescript' );

/**
 * Gulp task: Build project TypeScript for development
 */
gulp.task( 'ts:build--dev', () => {

    // Compile TypeScript (without sourcemaps), using two sources for better performance (#perfmatters)
    let tsSourceProject = ts.createProject( './tsconfig.json' );
    let tsSourceResult = gulp
        .src( [
            './src/**/*.ts'
        ] )
        .pipe( tsSourceProject( ts.reporter.defaultReporter() ) );
    let tsIndexProject = ts.createProject( './tsconfig.json' );
    let tsIndexResult = gulp
        .src( [
            './index.ts'
        ] )
        .pipe( tsIndexProject( ts.reporter.defaultReporter() ) );

    // Save results
    return merge( [
        tsSourceResult.js // Compiled JavaScript files
            .pipe( gulp.dest( './src/' ) ),
        tsIndexResult.js // Compiled JavaScript files
            .pipe( gulp.dest( './' ) )
    ] );

} );

/**
 * Gulp task: Build project TypeScript for production
 */
gulp.task( 'ts:build--prod', () => {

    // Compile TypeScript (including sourcemaps)
    let tsProject = ts.createProject( './tsconfig.json' );
    let tsResults = gulp
        .src( [
            './**/*.ts', // Select everything to keep the folder structure alive
            '!./node_modules/**', // Ignore dependencies
            '!./demo/**' // Ignore demo
        ] )
        .pipe( sourcemaps.init() )
        .pipe( tsProject( ts.reporter.defaultReporter() ) );

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
 * Gulp task: Build demo TypeScript
 */
gulp.task( 'ts:build--demo', () => {

    // Compile TypeScript (including sourcemaps)
    let tsProject = ts.createProject( './tsconfig.json' );
    let tsResults = gulp
        .src( [
            './demo/*.ts'
        ] )
        .pipe( tsProject() );

    // Save results
    return tsResults.js // Compiled JavaScript files
        .pipe( gulp.dest( './demo/' ) );

} );
