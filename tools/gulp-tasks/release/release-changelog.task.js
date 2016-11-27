'use strict';

const conventionalChangelog = require( 'gulp-conventional-changelog' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const insert = require( 'gulp-insert' );
const path = require( 'path' );

const customChangelogTransform = require( './custom-changelog-transform' );
const packageFile = require( './../../../package.json' );

/**
 * Gulp task: Generate the changelog file
 */
gulp.task( 'release:changelog', ( done ) => {
    let releaseUrl = `${ packageFile.repository.url.slice( 0, -4 ) }/releases`;
    gulp
        .src( [
            path.resolve( 'CHANGELOG.md' )
        ], { buffer: false } )
        .pipe( conventionalChangelog( {
            preset: 'angular',
            releaseCount: 0 // Regenerate the whole thing every time
        }, {
            linkCompare: false // We use a custom link
        }, {}, {}, {
            transform: customChangelogTransform.transform, // Show all commit types in the changelog
            mainTemplate: fs.readFileSync( path.resolve( 'tools', 'gulp-tasks', 'release', 'custom-changelog-main.hbs' ), 'utf-8' ),
            headerPartial: fs.readFileSync( path.resolve( 'tools', 'gulp-tasks', 'release', 'custom-changelog-header.hbs' ), 'utf-8' )
        } ) )
        .pipe( insert.prepend( `# Changelog\nAlso see [releases](${ releaseUrl }).\n\n` ) ) // Custom header
        .pipe( insert.append( `---\n\n*Changelog generated automatically.*\n` ) ) // Custom footer
        .pipe( gulp.dest( path.resolve( '.' ) ) )
        .on( 'end', done );
} );
