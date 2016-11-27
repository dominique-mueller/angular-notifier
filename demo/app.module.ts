import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotifierModule } from './../index';

import { AppComponent } from './app.component';

/**
 * App module
 */
@NgModule( {
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		NotifierModule.forRoot( {} )
	]
} )
export class AppModule {}
