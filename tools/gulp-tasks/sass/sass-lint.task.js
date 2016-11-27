'use strict';

const gulp = require( 'gulp' );
const path = require( 'path' );
const sassLint = require( 'gulp-sass-lint' );

/**
 * Gulp task: Lint project SASS
 */
gulp.task( 'sass:lint', () => {
    return gulp
        .src( [
            path.resolve( 'style.scss' ),
            path.resolve( 'src', 'styles', '**', '*.scss' )
        ] )
        .pipe( sassLint() )
        .pipe( sassLint.format() ) // Print results
        .pipe( sassLint.failOnError() ); // Let us know
} );
