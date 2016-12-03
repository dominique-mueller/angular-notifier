'use strict';

const conventionalGithubReleaser = require( 'conventional-github-releaser' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );

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
        mainTemplate: fs.readFileSync( 'tools/gulp/release/custom-changelog-main.hbs', 'utf-8' ),
        headerPartial: fs.readFileSync( 'tools/gulp/release/custom-changelog-header.hbs', 'utf-8' )
    }, done );
} );
