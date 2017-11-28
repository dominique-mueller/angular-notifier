module.exports = {
	input: 'build/library-es5/index.js',
	name: 'angular-notifier',
	format: 'umd',
	external: [
		'@angular/core',
		'@angular/common',
		'rxjs/Subject'
	],
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'rxjs/Subject': 'rxjs/Subject'
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
