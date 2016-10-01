'use strict';

/**
 * Imports
 */
const gulp = require( 'gulp' );

/**
 * Gulp tasks
 */
const releaseChangelog = require( './release/release-changelog.task' );
const releaseGit = require( './release/release-git.task' );
const releaseGithub = require( './release/release-github.task' );
const releaseVersion = require( './release/release-version.task' );

/**
 * Gulp task: Release process for Continuous Integration
 */
gulp.task( 'release', gulp.series( [
    'release:version',
    'release:changelog',
    'release:git',
    'release:github'
] ) );
