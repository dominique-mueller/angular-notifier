'use strict';

const gulp = require( 'gulp' );

const cleanTask = require( './tools/gulp/clean.task' );
const tsInlineResourcesTask = require( './tools/gulp/ts/ts-inline-resources.task' );
const tsBuildTask = require( './tools/gulp/ts/ts-build.task' );
const tsBundleTask = require( './tools/gulp/ts/ts-bundle.task' );

gulp.task( 'run',
	gulp.series( [
		gulp.parallel( [
			'clean:build-temp',
			'clean:build-bundles'
		] ),
		'ts:inline-resources',
		gulp.parallel( [
			gulp.series( [
				'ts:build-es2015',
				'ts:bundle-fesm2015'
			] ),
			gulp.series( [
				'ts:build-es5',
				'ts:bundle-fesm5'
			] )
		] )
	] )
);

// /**
//  * Gulp tasks: Environment
//  */
// const envCleanTasks = require( './tools/gulp/env/env-clean.task' );
// const envWatchTasks = require( './tools/gulp/env/env-watch.task' );

// /**
//  * Gulp tasks: SASS
//  */
// const sassBuildTasks = require( './tools/gulp/sass/sass-build.task' );
// const sassBundleTasks = require( './tools/gulp/sass/sass-bundle.task' );
// const sassLintTasks = require( './tools/gulp/sass/sass-lint.task' );

// /**
//  * Gulp tasks: TypeScript
//  */
// const tsBuildTasks = require( './tools/gulp/ts/ts-build.task' );
// const tsBundleTasks = require( './tools/gulp/ts/ts-bundle.task' );
// const tsLintTasks = require( './tools/gulp/ts/ts-lint.task' );
// const tsTestTasks = require( './tools/gulp/ts/ts-test.task' );



// /**
//  * Gulp task: Clean everything
//  */
// gulp.task( 'clean',
// 	gulp.parallel( [
// 		'env:clean--lib',
// 		'env:clean--bundles',
// 		'env:clean--demo',
// 		'env:clean--coverage'
// 	] )
// );

// /**
//  * Gulp task: Complete build for development
//  */
// gulp.task( 'build--dev',
//     gulp.series( [
//         'env:clean--lib',
//         gulp.parallel( [
//             'ts:build--dev',
//             'sass:build--dev'
//         ] )
//     ] )
// );

// /**
//  * Gulp task: Complete build for Production
//  */
// gulp.task( 'build--publish',
//     gulp.series( [
// 		'clean',
//         gulp.parallel( [
//             'ts:lint',
//             'sass:lint',
// 			gulp.series( [
//             	'sass:build--publish',
// 				gulp.parallel( [
//             		'sass:bundle',
//             		'sass:bundle:min'
// 				] )
// 			] ),
// 			gulp.series( [
//             	'ts:build--publish',
// 				gulp.parallel( [
// 					'ts:bundle:umd',
// 					'ts:bundle:umd:min'
// 				] )
// 			] )
//         ] )
//     ] )
// );

// /**
//  * Gulp task: Build demo
//  */
// gulp.task( 'build--demo',
//     gulp.series( [
//         'env:clean--demo',
//         'ts:build--demo'
//     ] )
// );

// /**
//  * Gulp task: Run all tests
//  */
// gulp.task( 'test',
// 	gulp.series( [
// 		gulp.parallel( [
// 			'env:clean--lib',
// 			'env:clean--coverage',
// 		] ),
// 		gulp.parallel( [
// 			'ts:build--dev',
// 			'ts:build--tests'
// 		] ),
//     	'ts:test--spec',
// 		'ts:test--coverage'
// 	] )
// );

// /**
//  * Gulp task: Run watcher
//  */
// gulp.task( 'watch',
// 	gulp.series( [
// 		gulp.parallel( [
// 			'env:clean--lib',
// 			'env:clean--demo',
// 		] ),
// 		gulp.parallel( [
// 			'build--dev',
// 			'build--demo'
// 		] ),
// 		gulp.parallel( [
// 			'env:serve',
// 			'env:watch'
// 		] )
// 	] )
// );
