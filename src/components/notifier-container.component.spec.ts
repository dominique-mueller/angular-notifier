import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Subject } from 'rxjs/Rx';

import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierAction, NotifierActionType } from '../models/notifier-action.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierQueueService } from '../services/notifier-queue.service';
import { NotifierNotificationComponent } from './notifier-notification.component';
import { NotifierContainerComponent } from './notifier-container.component';
import { NotifierService } from './../services/notifier.service';

/**
 * Notifier Container Component - Unit Test
 */
export function main(): void {

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
			spyOn( queueService, 'continue' );

			queueService.push( <any> {
				payload: 'STUFF',
				type: 'WHATEVS'
			} );
			componentFixture.detectChanges();
			tick();

			expect( queueService.continue ).toHaveBeenCalled();

		} ) );

		describe( '(show)', () => {

			it( 'should show the first notification', fakeAsync( () => {

				// Setup test module
				beforeEachWithConfig( new NotifierConfig() );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				queueService.push( {
					payload: {
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );

				const mockNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockNotificationComponent, 'show' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockNotificationComponent ); // Trigger the ready event manually

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
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the second notification
				queueService.push( {
					payload: {
						message: 'Blubberfish.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'show' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

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
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the second notification
				queueService.push( {
					payload: {
						message: 'Blubberfish.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the third notification
				queueService.push( {
					payload: {
						message: 'This. Is. Angular!',
						type: 'INFO'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockThirdNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockThirdNotificationComponent, 'show' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockThirdNotificationComponent ); // Trigger the ready event manually

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
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the second notification
				queueService.push( {
					payload: {
						message: 'Blubberfish.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the third notification
				queueService.push( {
					payload: {
						message: 'This. Is. Angular!',
						type: 'INFO'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockThirdNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockThirdNotificationComponent, 'show' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockThirdNotificationComponent ); // Trigger the ready event manually

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
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the second notification
				queueService.push( {
					payload: {
						message: 'Blubberfish.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				tick();

				// Create the third notification
				queueService.push( {
					payload: {
						message: 'This. Is. Angular!',
						type: 'INFO'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockThirdNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockThirdNotificationComponent, 'show' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockThirdNotificationComponent ); // Trigger the ready event manually

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
				spyOn( queueService, 'continue' );

				const testNotificationId: string = 'FAKE_ID';

				// Show notification
				queueService.push( {
					payload: {
						id: testNotificationId,
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockNotificationComponent ); // Trigger the ready event manually

				tick();

				// Hide notification
				queueService.push( {
					payload: testNotificationId,
					type: NotifierActionType.HIDE
				} );
				componentFixture.detectChanges();

				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						id: 'FAKE_ID',
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockNotificationComponent ); // Trigger the ready event manually

				tick();

				// Hide notification
				queueService.push( {
					payload: 'NOT_EXISTING_ID',
					type: NotifierActionType.HIDE
				} );
				componentFixture.detectChanges();
				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				let listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show second notification
				const testNotificationId: string = 'FAKE_ID';
				queueService.push( {
					payload: {
						id: testNotificationId,
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					payload: testNotificationId,
					type: NotifierActionType.HIDE
				} );
				componentFixture.detectChanges();

				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );
				expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show second notification
				const testNotificationId: string = 'FAKE_ID';
				queueService.push( {
					payload: {
						id: testNotificationId,
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					payload: testNotificationId,
					type: NotifierActionType.HIDE
				} );
				componentFixture.detectChanges();

				tick( testNotifierConfig.animations.hide.speed );
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );
				expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should shift before hiding the notification if necessary (with overlapping animations)', fakeAsync( () => {

				// Setup test module
				const testNotifierConfig: NotifierConfig = new NotifierConfig();
				beforeEachWithConfig( testNotifierConfig );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'shift' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show second notification
				const testNotificationId: string = 'FAKE_ID';
				queueService.push( {
					payload: {
						id: testNotificationId,
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					payload: testNotificationId,
					type: NotifierActionType.HIDE
				} );
				componentFixture.detectChanges();

				tick( testNotifierConfig.animations.hide.speed - <number> testNotifierConfig.animations.overlap );
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );
				expect( mockFirstNotificationComponent.shift ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should hide the notification when the dismiss event gets dispatched', fakeAsync( () => {

				// Setup test module
				beforeEachWithConfig( new NotifierConfig( {
					animations: {
						enabled: false
					}
				} ) );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Show second notification
				const testNotificationId: string = 'FAKE_ID';
				queueService.push( {
					payload: {
						id: testNotificationId,
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				componentInstance.onNotificationDismiss( testNotificationId );
				tick();
				componentFixture.detectChanges();

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 0 );
				expect( mockNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 2 );

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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						id: 'FAKE_ID',
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					type: NotifierActionType.HIDE_OLDEST
				} );
				componentFixture.detectChanges();

				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );
				expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).not.toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should skip hiding the oldest notification if there are no notifications', fakeAsync( () => {

				// Setup test module
				beforeEachWithConfig( new NotifierConfig( {
					animations: {
						enabled: false
					}
				} ) );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Hide notification
				queueService.push( {
					type: NotifierActionType.HIDE_OLDEST
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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show first notification
				queueService.push( {
					payload: {
						id: 'FAKE_ID',
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					type: NotifierActionType.HIDE_NEWEST
				} );
				componentFixture.detectChanges();

				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 1 );
				expect( mockFirstNotificationComponent.hide ).not.toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should skip hiding the newest notification if there are no notifications', fakeAsync( () => {

				// Setup test module
				beforeEachWithConfig( new NotifierConfig( {
					animations: {
						enabled: false
					}
				} ) );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Hide notification
				queueService.push( {
					type: NotifierActionType.HIDE_NEWEST
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
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					type: NotifierActionType.HIDE_ALL
				} );
				componentFixture.detectChanges();

				tick();
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 0 );
				expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should hide all notifications (with animations)', fakeAsync( () => {

				// Setup test module
				const testNotifierConfig: NotifierConfig = new NotifierConfig();
				beforeEachWithConfig( testNotifierConfig );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Lorem ipsum dolor sit amet.',
						type: 'SUCCESS'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockFirstNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockFirstNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockFirstNotificationComponent ); // Trigger the ready event manually

				// Show first notification
				queueService.push( {
					payload: {
						message: 'Whut.',
						type: 'ERROR'
					},
					type: NotifierActionType.SHOW
				} );
				componentFixture.detectChanges();
				const mockSecondNotificationComponent: any = new MockNotifierNotificationComponent();
				spyOn( mockSecondNotificationComponent, 'hide' ).and.callThrough(); // Continue
				componentInstance.onNotificationReady( mockSecondNotificationComponent ); // Trigger the ready event manually

				// Hide second notification
				queueService.push( {
					type: NotifierActionType.HIDE_ALL
				} );
				componentFixture.detectChanges();

				tick( testNotifierConfig.animations.hide.speed + ( 2 * <number> testNotifierConfig.animations.hide.offset ) );
				componentFixture.detectChanges(); // Run a second change detection (to update the template)

				const listElements: Array<DebugElement> = componentFixture.debugElement.queryAll( By.css( '.x-notifier__container-list' ) );

				expect( listElements.length ).toBe( 0 );
				expect( mockFirstNotificationComponent.hide ).toHaveBeenCalled();
				expect( mockSecondNotificationComponent.hide ).toHaveBeenCalled();
				expect( queueService.continue ).toHaveBeenCalledTimes( 3 );

			} ) );

			it( 'should skip hiding all notification if there are no notifications', fakeAsync( () => {

				// Setup test module
				beforeEachWithConfig( new NotifierConfig( {
					animations: {
						enabled: false
					}
				} ) );
				componentFixture.detectChanges();
				spyOn( queueService, 'continue' );

				// Hide notification
				queueService.push( {
					type: NotifierActionType.HIDE_ALL
				} );
				componentFixture.detectChanges();
				tick();

				expect( queueService.continue ).toHaveBeenCalled();

			} ) );

		} );

		/**
		 * Helper for upfront configuration
		 */
		function beforeEachWithConfig( testNotifierConfig: any ): void {

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

}

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
		return 42; // Random ...
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
