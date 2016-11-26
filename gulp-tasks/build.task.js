'use strict';

const gulp = require( 'gulp' );

const envClean = require( './env/env-clean.task' );
const sassBuild = require( './sass/sass-build.task' );
const sassLint = require( './sass/sass-lint.task' );
const tsBuild = require( './ts/ts-build.task' );
const tsLint = require( './ts/ts-lint.task' );

/**
 * Gulp task: Complete build for development
 */
gulp.task( 'build--dev',
    gulp.series( [
        'env:clean',
        gulp.parallel( [
            'ts:build--dev',
            'sass:build--dev'
        ] )
    ] )
);

/**
 * Gulp task: Complete build for Production
 */
gulp.task( 'build--prod',
    gulp.series( [
        'env:clean',
        gulp.parallel( [
            'ts:lint',
            'sass:lint',
            'ts:build--prod',
            'sass:build--prod'
        ] )
    ] )
);

/**
 * Gulp task: Build Demo
 */
gulp.task( 'build--demo',
    gulp.series( [
        'env:clean--demo',
        'ts:build--demo'
    ] )
);
