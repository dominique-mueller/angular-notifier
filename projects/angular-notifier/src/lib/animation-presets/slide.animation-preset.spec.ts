import { NotifierAnimationData, NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { slide } from './slide.animation-preset';

/**
 * Slide Animation Preset - Unit Test
 */
describe( 'Slide Animation Preset', () => {

	describe( '(show)', () => {

		it( 'should return animation keyframes for top-left position', () => {

			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'left'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0, 0 )`
				},
				to: {
					transform: 'translate3d( 0, 0, 0 )'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.show( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for top-right position', () => {

			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'right'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0, 0 )`
				},
				to: {
					transform: 'translate3d( 0, 0, 0 )'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.show( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for top-middle position', () => {

			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'middle'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( -50%, calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0 )`
				},
				to: {
					transform: 'translate3d( -50%, 0, 0 )'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.show( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for bottom-middle position', () => {

			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'middle'
					},
					vertical: {
						distance: 100,
						position: 'bottom'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( -50%, calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0 )`
				},
				to: {
					transform: 'translate3d( -50%, 0, 0 )'
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.show( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

	} );

	describe( '(hide)', () => {

		it( 'should return animation keyframes for top-left position', () => {
			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'left'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( 0, ${ testNotification.component.getShift() }px, 0 )`
				},
				to: {
					/* tslint:disable max-line-length */
					transform: `translate3d( calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), ${ testNotification.component.getShift() }px, 0 )`
					/* tslint:enable max-line-length */
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.hide( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for top-right position', () => {
			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'right'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( 0, ${ testNotification.component.getShift() }px, 0 )`
				},
				to: {
					/* tslint:disable max-line-length */
					transform: `translate3d( calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), ${ testNotification.component.getShift() }px, 0 )`
					/* tslint:enable max-line-length */
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.hide( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for top-middle position', () => {
			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'middle'
					},
					vertical: {
						distance: 100,
						position: 'top'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( -50%, ${ testNotification.component.getShift() }px, 0 )`
				},
				to: {
					transform: `translate3d( -50%, calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0 )`
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.hide( <any> testNotification );
			// tslint:enable no-any

			expect( keyframes ).toEqual( expectedKeyframes );

		} );

		it( 'should return animation keyframes for bottom-middle position', () => {
			const testConfig: NotifierConfig = new NotifierConfig( {
				position: {
					horizontal: {
						distance: 50,
						position: 'middle'
					},
					vertical: {
						distance: 100,
						position: 'bottom'
					}
				}
			} );
			const testNotification: MockNotification = new MockNotification( testConfig );
			const expectedKeyframes: NotifierAnimationPresetKeyframes = {
				from: {
					transform: `translate3d( -50%, ${ testNotification.component.getShift() }px, 0 )`
				},
				to: {
					transform: `translate3d( -50%, calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0 )`
				}
			};
			// tslint:disable no-any
			const keyframes: NotifierAnimationPresetKeyframes = slide.hide( <any> testNotification );
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
