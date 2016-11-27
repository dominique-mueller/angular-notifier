'use strict';

const bump = require( 'gulp-bump' );
const conventionalRecommendedBump = require( 'conventional-recommended-bump' );
const gulp = require( 'gulp' );
const path = require( 'path' );

/**
 * Gulp task: Update the version number within the packag file automatically
 */
gulp.task( 'release:version', ( done ) => {
    conventionalRecommendedBump( {
        preset: 'angular'
    }, ( error, result ) => {
        gulp
            .src( [
                path.resolve( 'package.json' )
            ] )
            .pipe( bump( {
                type: result.releaseType // Either 'major', 'minor', or 'patch'
            } ) )
            .pipe( gulp.dest( path.resolve( '.' ) ) )
            .on( 'end', done );

    } );
} );
