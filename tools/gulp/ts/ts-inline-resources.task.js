'use strict';

const gulp = require( 'gulp' );
const inlineTemplate = require( 'gulp-inline-ng2-template' );

const inlineTemplateOptions = {
    indent: 4,
    useRelativePaths: true
};

/**
 * Gulp task: Inline TypeScript resources
 */
gulp.task( 'ts:inline-resources', () => {

	return gulp
		.src( [
			'src/lib/**/*.ts',
			'!src/lib/**/*.spec.ts',
			'!src/lib/**/*.d.ts'
		] )
		.pipe( inlineTemplate( inlineTemplateOptions ) )
		.pipe( gulp.dest( 'build/temp/lib-inline' ) );

} );
