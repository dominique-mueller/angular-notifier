import { NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { fade } from './../animation-presets/fade.animation-preset';

/**
 * Fade animation preset - Unit Test
 */
export function main(): void {

	describe( 'Fade Animation Preset', () => {

		describe( '(show)', () => {

			it( 'should return animation keyframes', () => {

				const testNotification: any = new MockNotification( {} );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = fade.show( testNotification );

				expect( keyframes ).toEqual( expectedKeyframes );

			} );

		} );

		describe( '(hide)', () => {

			it( 'should return animation keyframes', () => {

				const testNotification: any = new MockNotification( {} );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = fade.hide( testNotification );

				expect( keyframes ).toEqual( expectedKeyframes );

			} );

		} );

	} );

}

/**
 * Mock notification, providing static values except the global configuration
 */
class MockNotification {

	/**
	 * Configuration
	 */
	public config: any;

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
	public component: any = {
		getConfig: () => this.config,
		getHeight: () => 40,
		getShift: () => 80,
		getWidth: () => 300
	};

	/**
	 * Constructor
	 *
	 * @param {any} config Configuration
	 */
	public constructor( config: any ) {
		this.config = config;
	}

}
