'use strict';

const gulp = require( 'gulp' );
const pureTslint = require( 'tslint' );
const typescript = require( 'typescript' );
const tslint = require( 'gulp-tslint' );

/**
 * Gulp task: Lint all TypeScript files (and check styleguide conventions)
 */
gulp.task( 'ts:lint', () => {

	// Enable type-checked rules (see <https://github.com/panuhorsmalahti/gulp-tslint/issues/105>)
    const tslintProgram = pureTslint.Linter.createProgram( 'tsconfig.json' );
	typescript.getPreEmitDiagnostics( tslintProgram );

    return gulp
        .src( 'src/lib/**/*.ts', {
            base: '.' // Fixes program issues (see <https://github.com/panuhorsmalahti/gulp-tslint/issues/71>)
        } )
        .pipe( tslint( { // Also runs codelyzer rules
            formatter: 'stylish',
            program: tslintProgram
        } ) )
        .pipe( tslint.report( {
			emitError: true,
            summarizeFailureOutput: true // Count tslint errors
        } ) );

} );
