module.exports = {
	entry: 'build/library-es5/angular-notifier.js',
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

		// For everything else, log a warning
		console.warn( warning.message );

	}
};
