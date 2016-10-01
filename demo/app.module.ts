/**
 * External imports
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Internal imports
 */
import { AppComponent } from './app.component';

/**
 * App module
 */
@NgModule( {
	imports: [ BrowserModule ],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ]
} )
export class AppModule {}
