/**
 * External imports
 */
import { Component } from '@angular/core';

import { NotifierService } from './../index';

/**
 * App component
 */
@Component( {
	selector: 'app',
	template: '<h1>Hello World</h1><button (click)="test()">Hit me</button><x-notifier-container></x-notifier-container>'
} )
export class AppComponent {

	private notifier: NotifierService;

	private counter: number;

	public constructor( notifier: NotifierService ) {
		this.notifier = notifier;
		this.counter = 1;
	}

	public test(): void {
		this.notifier.notify( 'test', `Notification #${ this.counter }` );
		this.counter++;
	}

}
