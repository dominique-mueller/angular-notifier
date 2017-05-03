import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Subject } from 'rxjs/Rx';

import { NotifierConfigToken } from '../notifier.module';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierAction } from '../models/notifier-action.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierQueueService } from '../services/notifier-queue.service';
import { NotifierNotificationComponent } from './notifier-notification.component';
import { NotifierContainerComponent } from './notifier-container.component';
import { NotifierService } from './../services/notifier.service';

/**
 * Notifier Container Component - Unit Test
 */
describe( 'Notifier Container Component', () => {

	let componentFixture: ComponentFixture<NotifierContainerComponent>;
	let componentInstance: NotifierContainerComponent;
	let queueService: MockNotifierQueueService;

	it( 'should instantiate', () => {

		// Setup test module
		beforeEachWithConfig( new NotifierConfig() );

		expect( componentInstance ).toBeDefined();

	} );

	it( 'should render', () => {

		// Setup test module
		beforeEachWithConfig( new NotifierConfig() );
		componentFixture.detectChanges();

	} );

	it( 'should ignore unknown actions', fakeAsync( () => {

		// Setup test module
		beforeEachWithConfig( new NotifierConfig() );
		componentFixture.detectChanges();
		jest.spyOn( queueService, 'continue' );

		// tslint:disable no-any
		queueService.push( <any> {
			payload: 'STUFF',
			type: 'WHATEVS'
		} );
		// tslint:enable no-any
		componentFixture.detectChanges();
		tick();

		expect( queueService.continue ).toHaveBeenCalled();

	} ) );

	describe( '(show)', () => {

		it( 'should show the first notification', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig() );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			expect( listElements.length ).toBe( 1 );

			const mockNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockNotificationComponent, 'show' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			expect( mockNotificationComponent.show ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

		it( 'should switch out the old notification with the new one when stacking is disabled', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				behaviour: {
					stacking: false
				}
			} ) );
			componentFixture.detectChanges();

			// Create the first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the second notification
			queueService.push( {
				payload: {
					message: 'Blubberfish.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'show' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.show ).toHaveBeenCalled();

		} ) );

		it( 'should hide and shift before showing the notification when stacking is enabled', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				},
				behaviour: {
					stacking: 2
				}
			} ) );
			componentFixture.detectChanges();

			// Create the first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the second notification
			queueService.push( {
				payload: {
					message: 'Blubberfish.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the third notification
			queueService.push( {
				payload: {
					message: 'This. Is. Angular!',
					type: 'INFO'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockThirdNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockThirdNotificationComponent, 'show' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockThirdNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockThirdNotificationComponent.show ).toHaveBeenCalled();

		} ) );

		it( 'should hide and shift before showing the notification, when stacking is enabled (with animations)', fakeAsync( () => {

			// Setup test module
			const testNotifierConfig: NotifierConfig = new NotifierConfig( {
				animations: {
					overlap: false
				},
				behaviour: {
					stacking: 2
				}
			} );
			beforeEachWithConfig( testNotifierConfig );
			componentFixture.detectChanges();

			// Create the first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the second notification
			queueService.push( {
				payload: {
					message: 'Blubberfish.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the third notification
			queueService.push( {
				payload: {
					message: 'This. Is. Angular!',
					type: 'INFO'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockThirdNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockThirdNotificationComponent, 'show' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockThirdNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockThirdNotificationComponent.show ).toHaveBeenCalled();

		} ) );

		it( 'should hide and shift before showing the notification, when tacking is enabled (with overlapping animations)', fakeAsync( () => {

			// Setup test module
			const testNotifierConfig: NotifierConfig = new NotifierConfig( {
				behaviour: {
					stacking: 2
				}
			} );
			beforeEachWithConfig( testNotifierConfig );
			componentFixture.detectChanges();

			// Create the first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the second notification
			queueService.push( {
				payload: {
					message: 'Blubberfish.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Create the third notification
			queueService.push( {
				payload: {
					message: 'This. Is. Angular!',
					type: 'INFO'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockThirdNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockThirdNotificationComponent, 'show' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockThirdNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick( testNotifierConfig.animations.hide.speed + testNotifierConfig.animations.shift.speed
				- <number> testNotifierConfig.animations.overlap );

			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockThirdNotificationComponent.show ).toHaveBeenCalled();

		} ) );

	} );

	describe( '(hide)', () => {

		it( 'should hide one notification', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			const testNotificationId: string = 'FAKE_ID';

			// Show notification
			queueService.push( {
				payload: {
					id: testNotificationId,
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Hide notification
			queueService.push( {
				payload: testNotificationId,
				type: 'HIDE'
			} );
			componentFixture.detectChanges();

			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			expect( listElements.length ).toBe( 0 );
			expect( mockNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

		it( 'should skip if the notification to hide does not exist', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					id: 'FAKE_ID',
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			tick();

			// Hide notification
			queueService.push( {
				payload: 'NOT_EXISTING_ID',
				type: 'HIDE'
			} );
			componentFixture.detectChanges();
			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			let listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			expect( listElements.length ).toBe( 1 );
			expect( mockNotificationComponent.hide ).not.toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

		it( 'should shift before hiding the notification if necessary', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show second notification
			const testNotificationId: string = 'FAKE_ID';
			queueService.push( {
				payload: {
					id: testNotificationId,
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				payload: testNotificationId,
				type: 'HIDE'
			} );
			componentFixture.detectChanges();

			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 1 );
			expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should shift before hiding the notification if necessary (with animations)', fakeAsync( () => {

			// Setup test module
			const testNotifierConfig: NotifierConfig = new NotifierConfig( {
				animations: {
					overlap: false
				}
			} );
			beforeEachWithConfig( testNotifierConfig );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show second notification
			const testNotificationId: string = 'FAKE_ID';
			queueService.push( {
				payload: {
					id: testNotificationId,
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				payload: testNotificationId,
				type: 'HIDE'
			} );
			componentFixture.detectChanges();

			tick( testNotifierConfig.animations.hide.speed );
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 1 );
			expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should shift before hiding the notification if necessary (with overlapping animations)', fakeAsync( () => {

			// Setup test module
			const testNotifierConfig: NotifierConfig = new NotifierConfig();
			beforeEachWithConfig( testNotifierConfig );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'shift' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show second notification
			const testNotificationId: string = 'FAKE_ID';
			queueService.push( {
				payload: {
					id: testNotificationId,
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				payload: testNotificationId,
				type: 'HIDE'
			} );
			componentFixture.detectChanges();

			tick( testNotifierConfig.animations.hide.speed - <number> testNotifierConfig.animations.overlap );
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 1 );
			expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should hide the notification when the dismiss event gets dispatched', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show second notification
			const testNotificationId: string = 'FAKE_ID';
			queueService.push( {
				payload: {
					id: testNotificationId,
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			componentInstance.onNotificationDismiss( testNotificationId );
			tick();
			componentFixture.detectChanges();

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 2;
			expect( listElements.length ).toBe( 0 );
			expect( mockNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

	} );

	describe( '(hide oldest / newest)', () => {

		it( 'should hide the oldest notification', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					id: 'FAKE_ID',
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				type: 'HIDE_OLDEST'
			} );
			componentFixture.detectChanges();

			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 1 );
			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).not.toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should skip hiding the oldest notification if there are no notifications', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Hide notification
			queueService.push( {
				type: 'HIDE_OLDEST'
			} );
			componentFixture.detectChanges();
			tick();

			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

		it( 'should hide the newest notification', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show first notification
			queueService.push( {
				payload: {
					id: 'FAKE_ID',
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				type: 'HIDE_NEWEST'
			} );
			componentFixture.detectChanges();

			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 1 );
			expect( mockFirstNotificationComponent.hide ).not.toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should skip hiding the newest notification if there are no notifications', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Hide notification
			queueService.push( {
				type: 'HIDE_NEWEST'
			} );
			componentFixture.detectChanges();
			tick();

			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

	} );

	describe( '(hide all)', () => {

		it( 'should hide all notifications', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				type: 'HIDE_ALL'
			} );
			componentFixture.detectChanges();

			tick();
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 0 );
			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should hide all notifications (with animations)', fakeAsync( () => {

			// Setup test module
			const testNotifierConfig: NotifierConfig = new NotifierConfig();
			beforeEachWithConfig( testNotifierConfig );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Lorem ipsum dolor sit amet.',
					type: 'SUCCESS'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockFirstNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockFirstNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockFirstNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Show first notification
			queueService.push( {
				payload: {
					message: 'Whut.',
					type: 'ERROR'
				},
				type: 'SHOW'
			} );
			componentFixture.detectChanges();
			const mockSecondNotificationComponent: MockNotifierNotificationComponent = new MockNotifierNotificationComponent();
			jest.spyOn( mockSecondNotificationComponent, 'hide' ); // Continue
			// tslint:disable no-any
			componentInstance.onNotificationReady( <any> mockSecondNotificationComponent ); // Trigger the ready event manually
			// tslint:enable no-any

			// Hide second notification
			queueService.push( {
				type: 'HIDE_ALL'
			} );
			componentFixture.detectChanges();

			const numberOfNotifications: number = 2;
			tick( testNotifierConfig.animations.hide.speed + ( numberOfNotifications * <number> testNotifierConfig.animations.hide.offset ) );
			componentFixture.detectChanges(); // Run a second change detection (to update the template)

			const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.notifier__container-list' ) );

			const expectedCallTimes: number = 3;
			expect( listElements.length ).toBe( 0 );
			expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
			expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
			expect( queueService.continue ).toHaveBeenCalledTimes( expectedCallTimes );

		} ) );

		it( 'should skip hiding all notification if there are no notifications', fakeAsync( () => {

			// Setup test module
			beforeEachWithConfig( new NotifierConfig( {
				animations: {
					enabled: false
				}
			} ) );
			componentFixture.detectChanges();
			jest.spyOn( queueService, 'continue' );

			// Hide notification
			queueService.push( {
				type: 'HIDE_ALL'
			} );
			componentFixture.detectChanges();
			tick();

			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

	} );

	/**
	 * Helper for upfront configuration
	 */
	function beforeEachWithConfig( testNotifierConfig: NotifierConfig ): void {

		TestBed.configureTestingModule( {
			declarations: [
				NotifierContainerComponent
			],
			providers: [
				{
					provide: NotifierService,
					useValue: {
						getConfig: () => testNotifierConfig
					}
				},
				{ // No idea why this is *actually* necessary -- it shouldn't be ...
					provide: NotifierConfigToken,
					useValue: {}
				},
				{
					provide: NotifierQueueService,
					useClass: MockNotifierQueueService
				}
			],
			schemas: [
				NO_ERRORS_SCHEMA // Ignore sub-components (inknown tags in the HTML template)
			]
		} );
		componentFixture = TestBed.createComponent( NotifierContainerComponent );
		componentInstance = componentFixture.componentInstance;

		queueService = TestBed.get( NotifierQueueService );

	}

} );

/**
 * Mock Notifier Queue Service
 */
class MockNotifierQueueService extends NotifierQueueService {

	/**
	 * Push a new action to the queue, and try to run it
	 *
	 * @param {NotifierAction} action Action object
	 *
	 * @override
	 */
	public push( action: NotifierAction ): void {
		this.actionStream.next( action );
	}

	/**
	 * Continue with the next action (called when the current action is finished)
	 *
	 * @override
	 */
	public continue(): void {
		// Do nothing
	}

}

/**
 * Random notification height
 */
const randomHeight: number = 42;

/**
 * Mock Notifier Notification Component
 */
class MockNotifierNotificationComponent { // Don't extend to prevent DI null issues

	/**
	 * Get notification element height (in px)
	 *
	 * @returns {number} Notification element height (in px)
	 *
	 * @override
	 */
	public getHeight(): number {
		return randomHeight; // Random ...
	}

	/**
	 * Show a notification
	 *
	 * @override
	 */
	public show(): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
			resolve(); // Do nothing
		} );
	}

	/**
	 * Shift a notification
	 *
	 * @override
	 */
	public shift(): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
			resolve(); // Do nothing
		} );
	}

	/**
	 * Hide a notification
	 *
	 * @override
	 */
	public hide(): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
			resolve(); // Do nothing
		} );
	}

}
