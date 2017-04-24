import { TestBed, inject } from '@angular/core/testing';

import { BehaviorSubject, Subject } from 'rxjs/Rx';

import { NotifierQueueService } from './notifier-queue.service';
import { NotifierAction } from '../models/notifier-action.model';

/**
 * Notifier Queue Service - Unit Test
 */
describe( 'Notifier Queue Service', () => {

	let queueService: NotifierQueueService;

	// Setup test module
	beforeEach( () => {
		TestBed.configureTestingModule( {
			providers: [
				NotifierQueueService
			]
		} );
	} );

	// Inject dependencies
	beforeEach( inject( [ NotifierQueueService ], ( notifierQueueService: NotifierQueueService ) => {
		queueService = notifierQueueService;
	} ) );

	it( 'should instantiate', () => {

		expect( queueService ).toBeDefined();
		expect( queueService.actionStream ).toEqual( jasmine.any( Subject ) );

	} );

	it( 'should pass through one action', () => {

		const testAction: NotifierAction = {
			payload: 'FANCY',
			type: 'SHOW'
		};
		let expectedTestAction: NotifierAction | undefined;

		queueService.actionStream.subscribe( ( action: NotifierAction ) => {
			expectedTestAction = action;
		} );
		queueService.push( testAction );

		expect( expectedTestAction ).toEqual( testAction );

	} );

	it( 'should pass through multiple actions in order', () => {

		const firstTestAction: NotifierAction = {
			payload: 'AWESOME',
			type: 'SHOW'
		};
		const secondTestAction: NotifierAction = {
			payload: 'GREAT',
			type: 'HIDE'
		};
		let expectedTestAction: NotifierAction | undefined;

		queueService.actionStream.subscribe( ( action: NotifierAction ) => {
			expectedTestAction = action;
		} );
		queueService.push( firstTestAction );
		queueService.push( secondTestAction );

		expect( expectedTestAction ).toEqual( firstTestAction );

		queueService.continue();

		expect( expectedTestAction ).toEqual( secondTestAction );

	} );

} );
