'use strict';

const gulp = require( 'gulp' );

const environmentClean = require( './environment/environment-clean.task' );
const sassBuild = require( './sass/sass-build.task' );
const sassLint = require( './sass/sass-lint.task' );
const typescriptBuild = require( './typescript/typescript-build.task' );
const typescriptLint = require( './typescript/typescript-lint.task' );

/**
 * Gulp task: Complete build for development
 */
gulp.task( 'build--dev',
    gulp.series( [
        'environment:clean',
        gulp.parallel( [
            'typescript:build--dev',
            'sass:build--dev'
        ] )
    ] )
);

/**
 * Gulp task: Complete build for Production
 */
gulp.task( 'build--prod',
    gulp.series( [
        'environment:clean',
        gulp.parallel( [
            'typescript:lint',
            'sass:lint',
            'typescript:build--prod',
            'sass:build--prod'
        ] )
    ] )
);

/**
 * Gulp task: Build Demo
 */
gulp.task( 'build--demo',
    gulp.series( [
        'environment:clean--demo',
        'typescript:build--demo'
    ] )
);
