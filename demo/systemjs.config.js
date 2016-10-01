'use strict';

System.config( {

	// Path shortcuts
	paths: {
		'npm:': './../node_modules/'
	},

	// Package location details
	map: {
		'app': './',
		'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'rxjs': 'npm:rxjs',
		'../': './../'
	},

	// Package loading details
	packages: {
		'app': {
			main: './main.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		},
		'../': {
			main: 'index.js',
			defaultExtension: 'js'
		}
	}

} );
