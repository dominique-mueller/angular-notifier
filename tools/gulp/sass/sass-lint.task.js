'use strict';

const gulp = require( 'gulp' );
const sassLint = require( 'gulp-sass-lint' );

/**
 * Gulp task: Lint project SASS
 */
gulp.task( 'sass:lint', () => {
    return gulp
        .src( [
            'style.scss',
            'src/styles/**/*.scss'
        ] )
        .pipe( sassLint() )
        .pipe( sassLint.format() ) // Print results
        .pipe( sassLint.failOnError() ); // Let us know
} );
