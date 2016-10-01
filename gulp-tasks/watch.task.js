'use strict';

/**
 * Imports
 */
const browserSync = require( 'browser-sync' );
const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const requireDir = require( 'require-dir' );

/**
 * Gulp tasks
 */
const buildTask = require( './build.task' );

/**
 * Gulp task: Browser-sync reload helper
 */
gulp.task( 'watch:reload', ( done ) => {
    browserSync.reload();
    done();
} );

/**
 * Gulp task: Start build watcher
 */
gulp.task( 'watch:build',
    gulp.series( [
        gulp.parallel( [
            'build:dev',
            'build:demo'
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

            // TypeScript watcher
            let tsWatcher = gulp.watch( [
                'index.ts',
                'src/**/*.ts',
                '!index.d.ts',
                '!src/**/*.d.ts'
            ], gulp.series( [
                'typescript:build',
                'watch:reload'
            ] ) );
            tsWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" (TypeScript) changed.` ) );
            } );

            // SASS watcher
            let sassWatcher = gulp.watch( [
                'style.scss',
                'src/styles/**/*.scss'
            ], gulp.series( [
                'sass:build',
                'watch:reload'
            ] ) );
            sassWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" (SASS) changed.` ) );
            } );

            // Other watcher
            let otherWatcher = gulp.watch( [
                'src/**/*.*',
                '!index.ts',
                '!index.d.ts',
                '!index.js',
                '!index.js.map',
                '!src/**/*.ts',
                '!src/**/*.d.ts',
                '!src/**/*.js',
                '!src/**/*.js.map',
                '!style.scss',
                '!style.css',
                '!src/**/*.scss',
                '!src/**/*.css'
            ], gulp.series( [
                'watch:reload'
            ] ) );
            otherWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" (other) changed.` ) );
            } );

            // Demo TypeScript Watcher
            let demoTsWatcher = gulp.watch( [
                'demo/*.ts'
            ], gulp.series( [
                'typescript:build:demo',
                'watch:reload'
            ] ) );
            demoTsWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" (TypeScript) changed.` ) );
            } );

            // Demo Other Watcher
            let demoOtherWatcher = gulp.watch( [
                'demo/*.*',
                '!demo/*.ts'
            ], gulp.series( [
                'watch:reload'
            ] ) );
            demoOtherWatcher.on( 'change', ( path ) => {
                gutil.log( gutil.colors.blue( `# The file "${ path }" (other) changed.` ) );
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
