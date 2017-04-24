'use strict';

const gulp = require( 'gulp' );
const inlineTemplate = require( 'gulp-inline-ng2-template' );

// Options ...
const inlineTemplateOptions = {
    indent: 4,
    useRelativePaths: true
};

/**
 * Gulp task: Inline ressources (Angular HTML templates into TypeScript class decorators)
 */
gulp.task( 'ts:inline-resources', () => {

	return gulp
		.src( [
			'src/lib/**/*.ts',
			'!src/lib/**/*.spec.ts',
			'!src/lib/**/*.d.ts'
		] )
		.pipe( inlineTemplate( inlineTemplateOptions ) )
		.pipe( gulp.dest( 'build/library-inline' ) );

} );
