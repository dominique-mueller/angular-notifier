'use strict';

const del = require( 'del' );
const exec = require( 'child_process' ).exec;
const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const htmlMinifier = require( 'html-minifier' );
const inlineTemplate = require( 'gulp-inline-ng2-template' );
const merge = require( 'merge2' );
const path = require( 'path' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const ts = require( 'gulp-typescript' );

const inlineTemplateOptions = {
    base: path.resolve( '.' ),
    indent: 0,
    removeLineBreaks: true,
    supportNonExistentFiles: false,
    target: 'ES6',
    templateExtension: '.html',
    templateProcessor: ( path, ext, file, callback ) => {
        try {
            const minifiedFile = htmlMinifier.minify( file, htmlMinifierOptions );
            callback( null, minifiedFile );
        } catch( error ) {
            new gutil.PluginError( {
                plugin: 'html-minifier',
                message: `HTML Minifier Error. ${ error }`
            } );
        }
    },
    useRelativePaths: true
};

const htmlMinifierOptions = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    decodeEntities: true,
    html5: true,
    keepClosingSlash: false,
    maxLineLength: 140,
    preserveLineBreaks: false,
    preventAttributesEscaping: false,
    processConditionalComments: false,
    quoteCharacter: '"',
    removeAttributeQuotes: false,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeTagWhitespace: false,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: false,
    useShortDoctype: true
};

/**
 * Gulp task: Build library TypeScript files for development
 */
gulp.task( 'ts:build--dev', () => {

    // Compile TypeScript into Javascript, including sourcemaps
    const tsSourceProject = ts.createProject( path.resolve( 'tsconfig.json' ) );
    const tsSourceResult = gulp
        .src( [
            path.resolve( 'src', '**', '*.ts' ),
            `${ path.resolve( 'src', '**', '*.spec.ts' ) }`,
        ] )
        .pipe( sourcemaps.init() )
        .pipe( inlineTemplate( inlineTemplateOptions ) )
        .pipe( tsSourceProject( ts.reporter.defaultReporter() ) );

    const tsIndexProject = ts.createProject( path.resolve( 'tsconfig.json' ) );
    const tsIndexResult = gulp
        .src( [
            path.resolve( 'index.ts' )
        ] )
        .pipe( sourcemaps.init() )
        .pipe( tsIndexProject( ts.reporter.defaultReporter() ) );

    // Save results
    return merge( [
        tsSourceResult.js // Compiled JavaScript files
            .pipe( sourcemaps.write( path.resolve( '.' ) ) )
            .pipe( gulp.dest( path.resolve( '.' ) ) ),
        tsIndexResult.js // Compiled JavaScript files
            .pipe( sourcemaps.write( path.resolve( '.' ) ) )
            .pipe( gulp.dest( path.resolve( '.' ) ) )
    ] );

} );

/**
 * Gulp task: Build library TypeScript files for publishment
 */
gulp.task( 'ts:build--publish', ( done ) => {

    // First, inline Angular HTML templates
    gulp
        .src( [
            path.resolve( 'src', '**', '*.ts' ),
            `!${ path.resolve( 'src', '**', '*.spec.ts' ) }`,
            path.resolve( 'index.ts' )
        ] )
        .pipe( inlineTemplate( inlineTemplateOptions ) )
        .pipe( gulp.dest( path.resolve( 'temp' ) ) )
        .on( 'end', () => {

            // Then, compile TypeScript using the Angular Compiler CLI (ngc)
            const angularCompiler = path.resolve( 'node_modules', '.bin', 'ngc' );
            const tsconfigForAot = path.resolve( 'tsconfig-aot.json' );
            exec( `${ angularCompiler } -p ${ tsconfigForAot }`, ( err, stdout, stderr ) => {
                if ( err ) {
                    new gutil.PluginError( {
                        plugin: 'ngc',
                        message: `Angular compiler error.\n${ err }`,
                        showStack: true
                    } );
                } else {

                    // Now, copy the results back into the source folder
                    gulp
                        .src( [
                            path.resolve( 'temp', '**', '*.d.ts' ),
                            path.resolve( 'temp', '**', '*.js' ),
                            path.resolve( 'temp', '**', '*.js.map' ),
                            path.resolve( 'temp', '**', '*.metadata.json' ),
                        ] )
                        .pipe( rename( ( path ) => {
                            path.dirname = path.dirname.replace( 'temp', '' );
                            return path;
                        } ) )
                        .pipe( gulp.dest( path.resolve( '.' ) ) )
                        .on( 'end', () => {

                            // Finally, delete our temporary folder
                            del( [
                                path.resolve( 'temp' )
                            ] ).then( () => {
                                done(); // Done
                            } )

                        } );

                }
            } );

        } );

} );

/**
 * Gulp task: Build TypeScript tests
 */
gulp.task( 'ts:build--tests', () => {

    // Compile TypeScript into Javascript
    let tsTestsProject = ts.createProject( path.resolve( 'tsconfig.json' ) );
    let tsTestResults = gulp
        .src( [
            path.resolve( 'src', '*.spec.ts' )
        ] )
        .pipe( tsTestsProject( ts.reporter.defaultReporter() ) );

    // Save results
    return tsTestResults.js // Compiled JavaScript files
        .pipe( gulp.dest( path.resolve( '.' ) ) );

} );

/**
 * Gulp task: Build demo TypeScript files
 */
gulp.task( 'ts:build--demo', () => {

    // Compile TypeScript into Javascript
    let tsDemoProject = ts.createProject( path.resolve( 'tsconfig.json' ) );
    let tsDemoResults = gulp
        .src( [
            path.resolve( 'demo', '*.ts' )
        ] )
        .pipe( tsDemoProject( ts.reporter.defaultReporter() ) );

    // Save results
    return tsDemoResults.js // Compiled JavaScript files
        .pipe( gulp.dest( path.resolve( '.' ) ) );

} );
