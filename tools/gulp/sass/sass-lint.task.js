'use strict';

const gulp = require( 'gulp' );
const sassLint = require( 'gulp-sass-lint' );

/**
 * Gulp task: Lint all SASS files
 */
gulp.task( 'sass:lint', () => {
    return gulp
        .src( 'src/lib/**/*.scss' )
        .pipe( sassLint() )
        .pipe( sassLint.format() ) // Print results
        .pipe( sassLint.failOnError() );
} );
