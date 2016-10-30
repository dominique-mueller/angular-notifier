'use strict';

const browserSync = require( 'browser-sync' );
const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const requireDir = require( 'require-dir' );

const buildTask = require( './build.task' );

/**
 * Gulp task: Browser-sync reload (helper only)
 */
gulp.task( 'watch:reload', ( done ) => {
    browserSync.reload();
    done();
} );

/**
 * Gulp task: Start watcher for build tasks (note: paths muts be written without dots in the beginning!!)
 */
gulp.task( 'watch:build',
    gulp.series( [
        gulp.parallel( [
            'build--dev',
            'build--demo'
        ] ),
        () => {

            // Configure browser-sync
            browserSync.init( {
                server: {
                    baseDir: './' // We need access to the node_modules folder
                },
                startPath: './demo/',
                logConnections: true,
                logPrefix: 'BrowserSync',
                notify: {
                    styles: { // Custom styles for the notification in the browser, bottom center
                        top: 'auto',
                        bottom: '0',
                        right: 'auto',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '0'
                    }
                }
            } );

            // TypeScript project watcher
            let tsWatcher = gulp.watch( [
                'index.ts',
                'src/**/*.ts'
            ], gulp.series( [
                'typescript:build--dev',
                'watch:reload'
            ] ) );
            tsWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# TypeScript file "${ path }" changed.` ) );
            } );

            // SASS project watcher
            let sassWatcher = gulp.watch( [
                'style.scss',
                'src/styles/**/*.scss'
            ], gulp.series( [
                'sass:build--dev',
                'watch:reload'
            ] ) );
            sassWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# SASS file "${ path }" changed.` ) );
            } );

            // TypeScript demo watcher
            let demoTsWatcher = gulp.watch( [
                'demo/*.ts'
            ], gulp.series( [
                'typescript:build--demo',
                'watch:reload'
            ] ) );
            demoTsWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# TypeScript file "${ path }" changed.` ) );
            } );

            // Other watchers ...
            let otherWatcher = gulp.watch( [
                'demo/index.html',
                'demo/systemjs.config.js',
                'demo/style.css'
            ], gulp.series( [
                'watch:reload'
            ] ) );
            otherWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" changed.` ) );
            } );

        }
    ] )
);

/**
 * Gulp task: Start test watcher (best in combination with the build watcher)
 */
gulp.task( 'watch:test', ( done ) => {
	new karma.Server( {
		configFile: `${__dirname }/../karma.config.js`
	}, done ).start();
} );
