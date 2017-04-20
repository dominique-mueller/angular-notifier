module.exports = {
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

		// For everything else, log a warning
		console.warn( warning.message );

	}
};
