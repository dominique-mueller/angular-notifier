'use strict';

/**
 * Imports
 */
const gulp = require( 'gulp' );
const tslint = require( 'gulp-tslint' );

/**
 * Gulp task: Lint typescript (+ styleguide)
 */
gulp.task( 'typescript:lint', () => {
    return gulp
        .src( [
            './index.ts',
            './src/**/*.ts',
            '!./src/**/*.d.ts'
        ] )
        .pipe( tslint( {
            formatter: 'verbose'
        } ) )
        .pipe( tslint.report() );
} );
