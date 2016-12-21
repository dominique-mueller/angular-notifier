import { NotifierAnimationData, NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { slide } from './../animation-presets/slide.animation-preset';

/**
 * Slide Animation Preset - Unit Test
 */
export function main(): void {

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0, 0 )`
					},
					to: {
						transform: 'translate3d( 0, 0, 0 )'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.show( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0, 0 )`
					},
					to: {
						transform: 'translate3d( 0, 0, 0 )'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.show( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( -50%, calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0 )`
					},
					to: {
						transform: 'translate3d( -50%, 0, 0 )'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.show( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( -50%, calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0 )`
					},
					to: {
						transform: 'translate3d( -50%, 0, 0 )'
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.show( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
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
				const keyframes: NotifierAnimationPresetKeyframes = slide.hide( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
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
				const keyframes: NotifierAnimationPresetKeyframes = slide.hide( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( -50%, ${ testNotification.component.getShift() }px, 0 )`
					},
					to: {
						transform: `translate3d( -50%, calc( -100% - ${ testConfig.position.horizontal.distance }px - 10px ), 0 )`
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.hide( testNotification );

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
				const testNotification: any = new MockNotification( testConfig );
				const expectedKeyframes: NotifierAnimationPresetKeyframes = {
					from: {
						transform: `translate3d( -50%, ${ testNotification.component.getShift() }px, 0 )`
					},
					to: {
						transform: `translate3d( -50%, calc( 100% + ${ testConfig.position.horizontal.distance }px + 10px ), 0 )`
					}
				};
				const keyframes: NotifierAnimationPresetKeyframes = slide.hide( testNotification );

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
