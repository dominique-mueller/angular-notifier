'use strict';

System.config( {

	// Path shortcuts
	paths: {
		'npm:': './../node_modules/'
	},

	// Package location details
	map: {

		// Demo & library
		'app': './',
		'../': './../',

		// Libraries
		'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'rxjs': 'npm:rxjs'

	},

	// Package loading details
	packages: {

		// App & library
		'app': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'../': {
			main: 'index.js',
			defaultExtension: 'js'
		},

		// Libraries
		'rxjs': {
			defaultExtension: 'js'
		}

	}

} );
