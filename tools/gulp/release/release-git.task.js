'use strict';

const fs = require( 'fs' );
const git = require( 'gulp-git' );
const gulp = require( 'gulp' );

/**
 * Gulp task: Commit all changes (the package and changelog files)
 */
gulp.task( 'release:git:commit', ( done ) => {
    const newVersion = getPackageJsonVersion();
    gulp
        .src( [ // Only package and changelog
            'package.json',
            'CHANGELOG.md'
        ] )
        .pipe( git.add( { quiet: true } ) )
        .pipe( git.commit( [
            `Release ${ newVersion } [skip ci]`, // Commit title
            `- Bumped version number to ${ newVersion }\n- Generated new changelog` // Commit body
        ] ) )
        .on( 'end', done );
} );

/**
 * Gulp task: Tag the current commit with the new version
 */
gulp.task( 'release:git:tag', ( done ) => {
    const newVersion = getPackageJsonVersion();
    git.tag( `${ newVersion }`, `Release of version ${ newVersion }.`, { quiet: true }, done );
} );

/**
 * Gulp task: Push both the commit and the tag to origin
 */
gulp.task( 'release:git:push', ( done ) => {
    git.push( 'origin', 'master', { args: ' --follow-tags' }, done );
} );

/**
 * Gulp task: Commit all changes to GitHub
 */
gulp.task( 'release:git', gulp.series( [
    'release:git:commit',
    'release:git:tag',
    'release:git:push'
] ) );

/**
 * Read the package.json version (do not require, prevents cached results)
 */
function getPackageJsonVersion() {
    return JSON.parse( fs.readFileSync( 'package.json', 'utf-8' ) ).version;
}
