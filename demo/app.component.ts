import { Component } from '@angular/core';

import { NotifierService } from './../index';

/**
 * App component
 */
@Component( {
	selector: 'app',
	template: `
		<h1>Hello World</h1>
		<button (click)="test()">Hit me</button>
		<button (click)="showSpecific()">Show specific</button>
		<button (click)="hideSpecific()">Hide specific</button>
		<button (click)="hideOldest()">Hide oldest</button>
		<button (click)="hideNewest()">Hide newest</button>
		<button (click)="hideAll()">Hide all</button>
		<x-notifier-container></x-notifier-container>
	`
} )
export class AppComponent {

	private notifier: NotifierService;

	private counter: number;

	public constructor( notifier: NotifierService ) {
		this.notifier = notifier;
		this.counter = 1;
	}

	public test(): void {
		this.notifier.notify( 'default', `Notification #${ this.counter }` );
		this.counter++;
	}

	public showSpecific(): void {
		this.notifier.show( {
			id: 'ID_SPECIFIC',
			message: 'Specific notification here',
			type: 'default'
		} );
	}

	public hideSpecific(): void {
		this.notifier.hide( 'ID_SPECIFIC' );
	}

	public hideAll(): void {
		this.notifier.hideAll();
	}

	public hideOldest(): void {
		this.notifier.hideOldest();
	}

	public hideNewest(): void {
		this.notifier.hideNewest();
	}

}
