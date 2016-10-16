'use strict';

const gulp = require( 'gulp' );
const merge = require( 'merge2' );
const sourcemaps = require( 'gulp-sourcemaps' );
const ts = require( 'gulp-typescript' );

/**
 * Gulp task: Build project TypeScript for development
 */
gulp.task( 'typescript:build--dev', () => {

    // Compile TypeScript (without sourcemaps), using two sources for better performance (#perfmatters)
    let tsSourceProject = ts.createProject( './tsconfig.json' );
    let tsSourceResult = gulp
        .src( [
            './src/**/*.ts', // Source files (except index file)
            './typings/index.d.ts' // Include typings
        ] )
        .pipe( tsSourceProject( ts.reporter.defaultReporter() ) );
    let tsIndexProject = ts.createProject( './tsconfig.json' );
    let tsIndexResult = gulp
        .src( [
            './index.ts', // Index file only
            './typings/index.d.ts' // Include typings
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
gulp.task( 'typescript:build--prod', () => {

    // Compile TypeScript (including sourcemaps)
    let tsProject = ts.createProject( './tsconfig.json' );
    let tsResults = gulp
        .src( [
            './**/*.ts', // Select everything to keep the folder structure alive
            '!./node_modules/**', // Ignore dependencies
            '!./demo/**', // Ignore demo
            '!./tyings/**', // Ignore typings ...
            './typings/index.d.ts' // but include the typings entry (only)
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
gulp.task( 'typescript:build--demo', () => {

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
