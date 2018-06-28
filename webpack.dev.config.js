'use strict';

const path = require( 'path' );

const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const CheckerPlugin = require( 'awesome-typescript-loader' ).CheckerPlugin;
const ContextReplacementPlugin = require( 'webpack/lib/ContextReplacementPlugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const HotModuleReplacementPlugin = require( 'webpack/lib/HotModuleReplacementPlugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const NamedModulesPlugin = require( 'webpack/lib/NamedModulesPlugin' );
const SourceMapDevToolPlugin = require( 'webpack/lib/SourceMapDevToolPlugin' );
const ScriptExtHtmlWebpackPlugin = require( 'script-ext-html-webpack-plugin' );
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

/**
 * Webpack Configuration
 */
module.exports = {

	// Mode
	mode: 'development',

	// Entry files
	entry: {
		app: [
			path.resolve( process.cwd(), 'src', 'demo', 'main.ts' )
		],
		polyfills: [
			path.resolve( process.cwd(), 'src', 'demo', 'polyfills.ts' )
		],
		demoStyles: [
			path.resolve( process.cwd(), 'src', 'demo', 'styles.css' )
		],
		styles: [
			path.resolve( process.cwd(), 'src', 'lib', 'styles.scss' )
		]
	},

	// File types to resolve
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			'.jsx'
		],
		modules: [
			path.resolve( process.cwd(), 'src' ),
			path.resolve( process.cwd(), 'node_modules' )
		]
	},

	// Output files
	output: {
		path: path.resolve( process.cwd(), 'build', 'dev' ),
		filename: '[name].js'
	},

	module: {

		rules: [

			// Handle TypeScript files
			{
				exclude: [
					/\.spec\.ts$/
				],
				test: /\.ts$/,
				use: [

					// Compile TypeScript into JavaScript
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: path.resolve( process.cwd(), 'tsconfig.json' ),
							// silent: true // Disable any output
						}
					},

					// Make Angular templateUrl definitions webpack-compatible (using 'require')
					// Note: This loader requires '@types/node' to be installed, else the TypeScript compiler throws an error
					{
						loader: 'angular2-template-loader'
					}

				]
			},

			// Handle SASS files
			{
				test: /\.scss$/,
				use: [

					// Inject CSS into the index.html file (inline)
					{
						loader: 'style-loader',
						options: {
							sourceMap: true // Enable support for SourceMaps
						}
					},

					// Read SASS
					// We use the 'css-loader' instead of the (theoratically more performant) 'raw-loader' as the 'raw-loader' does not seem
					// to work properly with the generation of SourceMaps
					{
						loader: 'css-loader',
						options: {
							sourceMap: true // Enable support for SourceMaps
						}
					},

					// Compile SASS into CSS
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'expanded',
							sourceMap: true, // Enable support for SourceMaps
							sourceMapContents: true
						}
					}
				]
			},

			// Handle CSS files
			{
				test: /\.css$/,
				use: [

					// Inject CSS into the index.html file (inline)
					{
						loader: 'style-loader',
						options: {
							sourceMap: true // Enable support for SourceMaps
						}
					},

					// Read SASS
					// We use the 'css-loader' instead of the (theoratically more performant) 'raw-loader' as the 'raw-loader' does not seem
					// to work properly with the generation of SourceMaps
					{
						loader: 'css-loader',
						options: {
							sourceMap: true // Enable support for SourceMaps
						}
					}
				]
			},

			// Handle HTML files
			{
				exclude: [
					path.resolve( process.cwd(), 'src', 'demo', 'index.html' ) // Ignore index.html file
				],
				test: /\.html$/,
				use: [

					// Read HTML
					{
						loader: 'raw-loader'
					}

				]
			}

		]

	},

	plugins: [

		// Fix Angular-specific warnings
		// For details, see <https://github.com/angular/angular/issues/11580> and <https://github.com/angular/angular/issues/14898>
		new ContextReplacementPlugin(
			/\@angular(\\|\/)core(\\|\/)fesm5/,
			path.resolve( __dirname, "./src" )
		),

		// Better TS compiler performance
		new CheckerPlugin(),

		// Source code generator
		new SourceMapDevToolPlugin( {
			filename: "[file].map",
			include: [ // Only generate sourcemaps for the app source code
				'app',
				'styles'
			],
			columns: false // Cheap & fast (good enough for development)
		} ),

		new HtmlWebpackPlugin( {
			template: path.resolve( process.cwd(), 'src', 'demo', 'index.html' ),
			chunksSortMode: 'dependency',
			inject: 'head'
		} ),

		new ScriptExtHtmlWebpackPlugin( {
			defaultAttribute: 'defer'
		} ),

		// Enable HMR globally
		new HotModuleReplacementPlugin(),

		// Print more readable module names in the browser console (on HMR updates)
		new NamedModulesPlugin(),

		// Browser Sync
		new BrowserSyncPlugin( {
			// Browser Sync options
			logPrefix: 'BrowserSync',
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:3100/', // Webpack Dev Server Endpoint
			notify: {
				styles: { // Custom styles for the notification in the browser, bottom center
					top: 'initial',
					bottom: '0',
					right: 'initial',
					left: '50%',
					padding: '15px 28px',
					fontSize: '12px',
					backgroundColor: 'rgba( 0, 0, 0, .9 )',
					transform: 'translateX( -50% )',
					borderRadius: '0'
				}
			}
		}, {
				// Browser Sync Plugin options
				reload: false // Disable auto-reloading, the Webpack Dev Server will take over this task
			} ),

		new SimpleProgressWebpackPlugin( {
			format: 'minimal'
		} ),

		new FriendlyErrorsWebpackPlugin( {
			compilationSuccessInfo: {
				messages: [ 'You application is running here http://localhost:3000' ],
				notes: [ 'Some additionnal notes to be displayed unpon successful compilation' ]
			},
		} )

	],

	devServer: {
		historyApiFallback: true,
		host: 'localhost',
		hot: true,
		port: 3100,
	}

};
