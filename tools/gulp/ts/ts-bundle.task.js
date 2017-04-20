'use strict';

const path = require( 'path' );

const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const rollup = require( 'gulp-rollup' );
const sourcemaps = require( 'gulp-sourcemaps' );

const rollupFesm2015Options = {
	entry: 'build/temp/lib-es2015/angular-notifier.js',
	moduleName: 'angular-notifier',
	format: 'es',
	external: [
		'@angular/core',
		'@angular/common',
		'rxjs/Subject'
	],
	onwarn: ( warning ) => {

		// Ignore warnings for external dependencies, such as Angular or RxJS
		if ( warning.message.indexOf( 'treating it as an external dependency' ) > -1 ) {
			return;
		}

		console.warn( warning.message );

	}
};
const rollupFesm5Options = {
	entry: 'build/temp/lib-es5/angular-notifier.js',
	moduleName: 'angular-notifier',
	format: 'es',
	external: [
		'@angular/core',
		'@angular/common',
		'rxjs/Subject'
	],
	onwarn: ( warning ) => {

		// Ignore warnings for external dependencies, such as Angular or RxJS
		if ( warning.message.indexOf( 'treating it as an external dependency' ) > -1 ) {
			return;
		}

		console.warn( warning.message );

	}
};
const rollupUmdOptions = {
	entry: 'build/temp/lib-es5/angular-notifier.js',
	moduleName: 'angular-notifier',
	format: 'umd',
	external: [
		'@angular/core',
		'@angular/common',
		'rxjs/Subject'
	],
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'rxjs/Subject': 'Rx'
	},
	onwarn: ( warning ) => {

		// Ignore warnings for external dependencies, such as Angular or RxJS
		if ( warning.message.indexOf( 'treating it as an external dependency' ) > -1 ) {
			return;
		}

		console.warn( warning.message );

	}
};
const sourcemapsOptions = {
	loadMaps: true
};

gulp.task( 'ts:bundle-fesm2015', () => {

	return gulp
		.src( 'build/temp/lib-es2015/**/*.js' )
		// .pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupFesm2015Options ) )
		.pipe( rename( 'angular-notifier.es2015.js' ) )
		// .pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

gulp.task( 'ts:bundle-fesm5', () => {

	return gulp
		.src( 'build/temp/lib-es5/**/*.js' )
		// .pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupFesm5Options ) )
		.pipe( rename( 'angular-notifier.es5.js' ) )
		// .pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

gulp.task( 'ts:bundle-umd', () => {

	return gulp
		.src( 'build/temp/lib-es5/**/*.js' )
		// .pipe( sourcemaps.init( sourcemapsOptions ) )
		.pipe( rollup( rollupUmdOptions ) )
		.pipe( rename( 'angular-notifier.umd.js' ) )
		// .pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( 'build/bundles' ) );

} );

