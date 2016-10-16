'use strict';

const gulp = require( 'gulp' );
const tslint = require( 'gulp-tslint' );

/**
 * Gulp task: Lint project TypeScript (and checks styleguide conventions)
 */
gulp.task( 'typescript:lint', () => {
    return gulp
        .src( [
            './index.ts',
            './src/**/*.ts'
        ] )
        .pipe( tslint( { // Also runs codelyzer rules
            formatter: 'verbose'
        } ) )
        .pipe( tslint.report() );
} );
