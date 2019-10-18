import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { fade } from './fade.animation-preset';

/**
 * Fade animation preset - Unit Test
 */
describe( 'Fade Animation Preset', () => {

	describe( '(show)', () => {

		it( 'should return animation keyframes', () => {

			const testNotification: MockNotification = new MockNotification( <NotifierConfig> {} );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					opacity: '0'
				},
				to: {
					opacity: '1'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = fade.show( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

	} );

	describe( '(hide)', () => {

		it( 'should return animation keyframes', () => {

			const testNotification: MockNotification = new MockNotification( <NotifierConfig> {} );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					opacity: '1'
				},
				to: {
					opacity: '0'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = fade.hide( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

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
 * Mock notification, providing static values except the global configuration
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

	// tslint:disable no-any
	/**
	 * Notification component
	 */
	public component: any = {
		getConfig: () => this.config,
		getHeight: () => mockNotificationHeight,
		getShift: () => mockNotificationShift,
		getWidth: () => mockNotificationWidth
	};
	// tslint:enable no-any

	/**
	 * Constructor
	 *
	 * @param {NotifierConfig} config Configuration
	 */
	public constructor( config: NotifierConfig ) {
		this.config = config;
	}

}
