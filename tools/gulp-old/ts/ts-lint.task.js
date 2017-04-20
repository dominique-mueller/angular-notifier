'use strict';

const gulp = require( 'gulp' );
const gulpTslint = require( 'gulp-tslint' );
const path = require( 'path' );
const tslint = require( 'tslint' );

/**
 * Gulp task: Lint project TypeScript (and checks styleguide conventions)
 */
gulp.task( 'ts:lint', () => {

    const program = tslint.Linter.createProgram( path.resolve( 'tsconfig.json' ) ); // Enable type-checked rules

    return gulp
        .src( [
            'index.ts',
            'src/**/*.ts',
            '!src/**/*.d.ts'
        ], {
            base: '.' // Fixes program issues, see <https://github.com/panuhorsmalahti/gulp-tslint/issues/71>
        } )
        .pipe( gulpTslint( { // Also runs codelyzer rules
            formatter: 'prose',
            program
        } ) )
        .pipe( gulpTslint.report( {
            summarizeFailureOutput: true // Count tslint errors
        } ) );

} );
