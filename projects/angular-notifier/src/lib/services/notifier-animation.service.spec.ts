import { inject, TestBed } from '@angular/core/testing';

import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierAnimationData } from '../models/notifier-animation.model';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierAnimationService } from './notifier-animation.service';

/**
 * Notifier Animation Service - Unit Test
 */
describe( 'Notifier Animation Service', () => {

	let animationService: NotifierAnimationService;

	// Setup test module
	beforeEach( () => {
		TestBed.configureTestingModule( {
			providers: [
				NotifierAnimationService
			]
		} );
	} );

	// Inject dependencies
	beforeEach( inject( [ NotifierAnimationService ], ( notifierAnimationService: NotifierAnimationService ) => {
		animationService = notifierAnimationService;
	} ) );

	it( 'should instantiate', () => {

		expect( animationService ).toBeDefined();

	} );

	it( 'should build the animation data for showing a notification', () => {

		const testConfig: NotifierConfig = new NotifierConfig( {
			animations: {
				show: {
					easing: 'ease-in-out',
					preset: 'fade',
					speed: 400
				}
			}
		} );
		const testNotification: MockNotification = new MockNotification( testConfig );
		const expectedAnimationData: NotifierAnimationData = {
			keyframes: [
				{
					opacity: '0'
				},
				{
					opacity: '1'
				}
			],
			options: {
				duration: testConfig.animations.show.speed,
				easing: testConfig.animations.show.easing,
				fill: 'forwards'
			}
		};
		// tslint:disable no-any
		const animationData: NotifierAnimationData = animationService.getAnimationData( 'show', <any> testNotification );
		// tslint:enable no-any

		expect( animationData ).toEqual( expectedAnimationData );

	} );

	it( 'should build the animation data for hiding a notification', () => {

		const testConfig: NotifierConfig = new NotifierConfig( {
			animations: {
				hide: {
					easing: 'ease-in-out',
					preset: 'fade',
					speed: 400
				}
			}
		} );
		const testNotification: MockNotification = new MockNotification( testConfig );
		const expectedAnimationData: NotifierAnimationData = {
			keyframes: [
				{
					opacity: '1'
				},
				{
					opacity: '0'
				}
			],
			options: {
				duration: testConfig.animations.hide.speed,
				easing: testConfig.animations.hide.easing,
				fill: 'forwards'
			}
		};
		// tslint:disable no-any
		const animationData: NotifierAnimationData = animationService.getAnimationData( 'hide', <any> testNotification );
		// tslint:enable no-any

		expect( animationData ).toEqual( expectedAnimationData );

	} );

} );

/**
 * Mock Notification Height
 */
const mockNotificationHeight: number = 40;

/**
 * Mock Notification Shift
 */
const mockNotificationShift: number = 80;

/**
 * Mock Notification Width
 */
const mockNotificationWidth: number = 300;

/**
 * Mock notification
 */
class MockNotification {

	/**
	 * Configuration
	 */
	public config: NotifierConfig;

	/**
	 * Notification ID
	 */
	public id: string = 'ID_FAKE';

	/**
	 * Notification type
	 */
	public type: string = 'SUCCESS';

	/**
	 * Notification message
	 */
	public message: string = 'Lorem ipsum dolor sit amet.';

	/**
	 * Notification component
	 */
	public component: { [ key: string ]: Function } = {
		getConfig: () => this.config,
		getHeight: () => mockNotificationHeight,
		getShift: () => mockNotificationShift,
		getWidth: () => mockNotificationWidth
	};

	/**
	 * Constructor
	 *
	 * @param {NotifierConfig} config Configuration
	 */
	public constructor( config: NotifierConfig ) {
		this.config = config;
	}

}
