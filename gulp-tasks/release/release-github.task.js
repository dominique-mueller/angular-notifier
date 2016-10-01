'use strict';

/**
 * Imports
 */
const conventionalGithubReleaser = require( 'conventional-github-releaser' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );

/**
 * Options
 */
const customChangelogTransform = require( './custom-changelog-transform' );

/**
 * Gulp task: Create a GitHub release
 */
gulp.task( 'release:github', ( done ) => {
    conventionalGithubReleaser( {
        type: 'oauth',
        token: process.env.GH_TOKEN // ENVIRONMENT VARIABLE
    }, {
        preset: 'angular'
    }, {}, {}, {}, {
        transform: customChangelogTransform.transform, // Custom transform (shows all commit types)
        mainTemplate: fs.readFileSync( `${ __dirname }/custom-changelog-main.hbs`, 'utf-8' ), // Custom main template
        headerPartial: fs.readFileSync( `${ __dirname }/custom-changelog-header.hbs`, 'utf-8' ) // Custom header template
    }, done );
} );
