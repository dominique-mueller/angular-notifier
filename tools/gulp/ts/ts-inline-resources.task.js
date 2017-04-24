'use strict';

const gulp = require( 'gulp' );
const htmlMinifier = require( 'html-minifier' );
const inlineTemplate = require( 'gulp-inline-ng2-template' );

// Options ...
const htmlMinifierOptions = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    decodeEntities: true,
    html5: true,
    keepClosingSlash: false,
    maxLineLength: false,
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
const inlineTemplateOptions = {
    indent: 0, // Remove all whitespace
	removeLineBreaks: true, // Get rid of linebreaks
    useRelativePaths: true,
	templateProcessor: ( path, ext, file, callback ) => { // Minify HTML to preserve SourceMaps
        try {
            const minifiedFile = htmlMinifier.minify( file, htmlMinifierOptions );
            callback( null, minifiedFile );
        } catch( error ) {
            throw new Error( `HTML Minifier Error. ${ error }` );
        }
    },
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
