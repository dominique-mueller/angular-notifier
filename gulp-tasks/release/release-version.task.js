'use strict';

/**
 * Imports
 */
const bump = require( 'gulp-bump' );
const conventionalRecommendedBump = require( 'conventional-recommended-bump' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Update the version number within the packag file automatically
 */
gulp.task( 'release:version', ( done ) => {
    conventionalRecommendedBump( {
        preset: 'angular'
    }, ( error, result ) => {
        gulp
            .src( './package.json' )
            .pipe( bump( {
                type: result.releaseType // Either 'major', 'minor', or 'patch'
            } ) )
            .pipe( gulp.dest( './' ) )
            .on( 'end', done );

    } );
} );
