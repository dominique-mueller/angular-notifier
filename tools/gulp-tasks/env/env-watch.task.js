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
            baseDir: path.resolve( '.' ) // We need access to the node_modules folder
        },
        startPath: path.resolve( 'demo' ),
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
gulp.task( 'env:serve-reload', ( done ) => {
    browserSync.reload();
    done();
} );

/**
 * Gulp task: Watch files for changes
 */
gulp.task( 'env:watch', () => {

    // TypeScript project watcher
    let tsWatcher = gulp.watch( [
        path.resolve( 'index.ts' ),
        path.resolve( 'src', '**', '*.ts' ),
        `!${ path.resolve( 'src', '**', '*.d.ts' ) }`,
        `!${ path.resolve( 'src', '**', '*.spec.ts' ) }`,
    ], gulp.series( [
        'ts:build--dev',
        'env:watch:reload'
    ] ) );
    tsWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

    // SASS project watcher
    let sassWatcher = gulp.watch( [
        path.resolve( 'style.scss' ),
        path.resolve( 'src', 'styles', '**', '*.scss' )
    ], gulp.series( [
        'sass:build--dev',
        'env:watch:reload'
    ] ) );
    sassWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

    // TypeScript demo watcher
    let demoTsWatcher = gulp.watch( [
        path.resolve( 'demo', '*.ts' )
    ], gulp.series( [
        'ts:build--demo',
        'env:watch:reload'
    ] ) );
    demoTsWatcher.on( 'change', ( path ) => {
        gutil.log( gutil.colors.blue( `# File "${ path }" changed.` ) );
    } );

} );
