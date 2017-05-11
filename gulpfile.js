'use strict';

const gulp = require( 'gulp' );

// Tasks ...
const envCleanTask = require( './tools/gulp/env/env-clean.task' );
const envDistTask = require( './tools/gulp/env/env-dist.task' );
const envReleaseTask = require( './tools/gulp/env/env-release.task' );
const tsInlineResourcesTask = require( './tools/gulp/ts/ts-inline-resources.task' );
const tsBuildTask = require( './tools/gulp/ts/ts-build.task' );
const tsBundleTask = require( './tools/gulp/ts/ts-bundle.task' );
const tsLintTask = require( './tools/gulp/ts/ts-lint.task' );
const sassBuildTask = require( './tools/gulp/sass/sass-build.task' );
const sassLintTask = require( './tools/gulp/sass/sass-lint.task' );

/**
 * Gulp task: Run linter
 */
gulp.task( 'lint',
	gulp.parallel( [
		'ts:lint',
		'sass:lint'
	] )
);

/**
 * Gulp task: Clean all build files
 */
gulp.task( 'clean',
	gulp.parallel( [
		'env:clean-build',
		'env:clean-dist',
		'env:clean-coverage'
	] )
);

/**
 * Gulp task: Run full build
 */
gulp.task( 'build',
	gulp.parallel( [
		'sass:build',
		gulp.series( [
			'ts:inline-resources',
			gulp.parallel( [
				gulp.series( [
					'ts:build-es2015',
					'ts:bundle-fesm2015'
				] ),
				gulp.series( [
					'ts:build-es5',
					'ts:bundle-fesm5',
					'ts:bundle-umd'
				] )
			] )
		] )
	] )
);

/**
 * Gulp task: Build for publishment
 */
gulp.task( 'run',
	gulp.series( [
		'clean',
		'build',
		'env:dist',
		'env:clean-build'
	] )
);
