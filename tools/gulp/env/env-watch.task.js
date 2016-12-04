'use strict';

const browserSync = require( 'browser-sync' );
const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );

/**
 * Gulp task: Start watcher for build tasks (note: paths muts be written without dots in the beginning!!)
 */
gulp.task( 'env:serve', () => {

    // Configure browser-sync
    browserSync.init( {
        server: {
            baseDir: '.' // We need access to the node_modules folder
        },
        startPath: '/demo',
        logConnections: true,
        logPrefix: '[BROWSER-SYNC]',
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

} );

/**
 * Gulp task: Browser-sync reload (helper only)
 */
gulp.task( 'env:serve:reload', ( done ) => {
    browserSync.reload();
    done();
} );

/**
 * Gulp task: Watch files for changes
 */
gulp.task( 'env:watch', () => {

    // TypeScript project watcher
    let tsWatcher = gulp.watch( [
        'index.ts',
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/*.spec.ts'
    ], gulp.series( [
        'ts:build--dev',
        'env:serve:reload'
    ] ) );
    tsWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

    // SASS project watcher
    let sassWatcher = gulp.watch( [
        'style.scss',
        'src/styles/**/*.scss'
    ], gulp.series( [
        'sass:build--dev',
        'env:serve:reload'
    ] ) );
    sassWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

    // TypeScript demo watcher
    let demoTsWatcher = gulp.watch( [
        'demo/*.ts'
    ], gulp.series( [
        'ts:build--demo',
        'env:serve:reload'
    ] ) );
    demoTsWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

} );
