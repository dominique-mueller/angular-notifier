import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';

import { NotifierAnimationData } from './../models/notifier-animation.model';
import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierNotification } from './../models/notifier-notification.model';
import { NotifierAnimationService } from './../services/notifier-animation.service';
import { NotifierTimerService } from './../services/notifier-timer.service';
import { NotifierService } from './../services/notifier.service';

/**
 * Notifier notification component
 * -------------------------------
 * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
 * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
 * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
 * mouse movements.
 */
@Component( {
	changeDetection: ChangeDetectionStrategy.OnPush, // (#perfmatters)
	host: {
		class: 'x-notifier__notification',
		'(click)': 'onNotificationClick()',
		'(mouseover)': 'onNotificationMouseover()',
		'(mouseout)': 'onNotificationMouseout()'
	},
	providers: [
		// We provide the timer to the component's local injector, so that every notification components gets its own
		// instance of the timer service, thus running their timers independently from each other
		NotifierTimerService
	],
	selector: 'x-notifier-notification',
	template: `
		<p class="x-notifier__notification-message">{{ notification.message }}</p>
		<button class="x-notifier__notification-button" type="button" title="dismiss"
			*ngIf="config.behaviour.showDismissButton" (click)="onClickDismiss()">
			<svg class="x-notifier__notification-button-icon" viewBox="0 0 24 24" width="20" height="20">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
			</svg>
		</button>
	`
} )
export class NotifierNotificationComponent implements AfterViewInit {

	/**
	 * Input: Notification object, contains all details necessary to construct the notification
	 */
	@Input()
	public notification: NotifierNotification;

	/**
	 * Output: Ready event, handles the initialization success by emitting a reference to this notification component
	 */
	@Output()
	public ready: EventEmitter<NotifierNotificationComponent>;

	/**
	 * Output: Dismiss event, handles the click on the dismiss button by emitting the notification ID of this notification component
	 */
	@Output()
	public dismiss: EventEmitter<string>;

	/**
	 * Notifier timer service
	 */
	private readonly timerService: NotifierTimerService;

	/**
	 * Notifier animation service
	 */
	private readonly animationService: NotifierAnimationService;

	/**
	 * Angular renderer, used to preserve the overall DOM abstraction & independence
	 */
	private readonly renderer: Renderer;

	/**
	 * Notifier configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * Native element reference, used for manipulating DOM properties
	 */
	private readonly element: any; // Similar to an HTMLElement, but also includes web animations properties / methods

	/**
	 * Current notification height, calculated and cached here (#perfmatters)
	 */
	private elementHeight: number;

	/**
	 * Current notification width, calculated and cached here (#perfmatters)
	 */
	private elementWidth: number;

	/**
	 * Current notification shift, calculated and cached here (#perfmatters)
	 */
	private elementShift: number;

	/**
	 * Constructor
	 *
	 * @param {ElementRef}               elementRef               Reference to the component's element
	 * @param {Renderer}                 renderer                 Angular renderer
	 * @param {NotifierService}          notifierService          Notifier service
	 * @param {NotifierTimerService}     notifierTimerService     Notifier timer service
	 * @param {NotifierAnimationService} notifierAnimationService Notifier animation service
	 */
	public constructor( elementRef: ElementRef, renderer: Renderer, notifierService: NotifierService,
		notifierTimerService: NotifierTimerService, notifierAnimationService: NotifierAnimationService ) {
		this.config = notifierService.getConfig();
		this.ready = new EventEmitter<NotifierNotificationComponent>();
		this.dismiss = new EventEmitter<string>();
		this.timerService = notifierTimerService;
		this.animationService = notifierAnimationService;
		this.renderer = renderer;
		this.element = elementRef.nativeElement;
		this.elementShift = 0;
	}

	/**
	 * Component after view init lifecycle hook, setts up the component and then emits the ready event
	 */
	public ngAfterViewInit(): void {
		this.setup();
		this.elementHeight = this.element.offsetHeight;
		this.elementWidth = this.element.offsetWidth;
		this.ready.emit( this );
	}

	/**
	 * Get the notifier config
	 *
	 * @returns {NotifierConfig} Notifier configuration
	 */
	public getConfig(): NotifierConfig {
		return this.config;
	}

	/**
	 * Get notification element height (in px)
	 *
	 * @returns {number} Notification element height (in px)
	 */
	public getHeight(): number {
		return this.elementHeight;
	}

	/**
	 * Get notification element width (in px)
	 *
	 * @returns {number} Notification element height (in px)
	 */
	public getWidth(): number {
		return this.elementWidth;
	}

	/**
	 * Get notification shift offset (in px)
	 *
	 * @returns {number} Notification element shift offset (in px)
	 */
	public getShift(): number {
		return this.elementShift;
	}

	/**
	 * Show (animate in) this notification
	 *
	 * @returns {Promise<undefined>} Promise, resolved when done
	 */
	public show(): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			// Are animations enabled?
			if ( this.config.animations.enabled && this.config.animations.show.speed > 0 ) {

				// Get animation data
				const animationData: NotifierAnimationData = this.animationService.getAnimationData( 'show', this.notification );

				// Set initial styles (styles before animation), prevents quick flicker when animation starts
				const animatedProperties: Array<string> = Object.keys( animationData.keyframes[ 0 ] );
				for ( let i: number = animatedProperties.length - 1; i >= 0; i-- ) {
					this.setStyle( animatedProperties[ i ], animationData.keyframes[ 0 ][ animatedProperties[ i ] ] );
				}

				// Animate notification in
				this.setStyle( 'visibility', 'visible' );
				this.element.animate( animationData.keyframes, animationData.options ).finished.then( () => {
					this.startAutoHideTimer();
					resolve(); // Done
				} );

			} else {

				// Show notification
				this.setStyle( 'visibility', 'visible' );
				this.startAutoHideTimer();
				resolve(); // Done

			}

		} );

	}

	/**
	 * Hide (animate out) this notification
	 *
	 * @returns {Promise<undefined>} Promise, resolved when done
	 */
	public hide(): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			this.stopAutoHideTimer();

			// Are animations enabled?
			if ( this.config.animations.enabled && this.config.animations.hide.speed > 0 ) {
				const animationData: NotifierAnimationData = this.animationService.getAnimationData( 'hide', this.notification );
				this.element.animate( animationData.keyframes, animationData.options ).finished.then( resolve ); // Done
			} else {
				resolve(); // Done
			}

		} );
	}

	/**
	 * Shift (move) this notification
	 *
	 * @param   {number}             distance         Distance to shift (in px)
	 * @param   {boolean}            shiftToMakePlace Flag, defining in which direction to shift
	 * @returns {Promise<undefined>}                  Promise, resolved when done
	 */
	public shift( distance: number, shiftToMakePlace: boolean ): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			// Calculate new position (position after the shift)
			let newElementShift: number;
			switch ( this.config.position.vertical.position ) {
				case 'top':
					if ( shiftToMakePlace ) {
						newElementShift = this.elementShift + distance + this.config.position.vertical.gap;
					} else {
						newElementShift = this.elementShift - distance - this.config.position.vertical.gap;
					}
					break;
				case 'bottom':
					if ( shiftToMakePlace ) {
						newElementShift = this.elementShift - distance - this.config.position.vertical.gap;
					} else {
						newElementShift = this.elementShift + distance + this.config.position.vertical.gap;
					}
					break;
				default:
					throw new Error( `Notifier Error: "${ this.config.position.vertical.position }" is not a valid vertical position.` );
			}
			const horizontalPosition: string = this.config.position.horizontal.position === 'middle' ? '-50%' : '0';

			// Are animations enabled?
			if ( this.config.animations.enabled && this.config.animations.shift.speed > 0 ) {
				const animationData: NotifierAnimationData = { // TODO: Extract into animation service
					keyframes: [
						{
							transform: `translate3d( ${ horizontalPosition }, ${ this.elementShift }px, 0 )`
						},
						{
							transform: `translate3d( ${ horizontalPosition }, ${ newElementShift }px, 0 )`
						}
					],
					options: {
						duration: this.config.animations.shift.speed,
						easing: this.config.animations.shift.easing,
						fill: 'forwards'
					}
				};
				this.elementShift = newElementShift;
				this.element.animate( animationData.keyframes, animationData.options ).finished.then( resolve ); // Done
			} else {
				this.setStyle( 'transform', `translate3d( ${ horizontalPosition }, ${ newElementShift }px, 0 )` );
				this.elementShift = newElementShift;
				resolve(); // Done
			}

		} );

	}

	/**
	 * Handle click on dismiss button
	 */
	public onClickDismiss(): void {
		this.dismiss.emit( this.notification.id );
	}

	/**
	 * Handle mouseover over notification area
	 */
	public onNotificationMouseover(): void {
		switch ( this.config.behaviour.onMouseover ) {
			case 'pauseAutoHide':
				this.pauseAutoHideTimer();
				break;
			case 'resetAutoHide':
				this.stopAutoHideTimer();
				break;
			default:
				return; // Ignore other values
		}
	}

	/**
	 * Handle mouseout from notification area
	 */
	public onNotificationMouseout(): void {
		this.startAutoHideTimer();
	}

	/**
	 * Handle click on notification area
	 */
	public onNotificationClick(): void {
		switch ( this.config.behaviour.onClick ) {
			case 'hide':
				this.pauseAutoHideTimer();
				break;
			default:
				return; // Ignore other values
		}
	}

	/**
	 * Start the auto hide timer (if enabled)
	 */
	private startAutoHideTimer(): void {
		if ( this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0 ) {
			this.timerService.start( this.config.behaviour.autoHide ).then( () => {
				this.onClickDismiss();
			} );
		}
	}

	/**
	 * Pause the auto hide timer (if enabled)
	 */
	private pauseAutoHideTimer(): void {
		if ( this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0 ) {
			this.timerService.pause();
		}
	}

	/**
	 * Stop the auto hide timer (if enabled)
	 */
	private stopAutoHideTimer(): void {
		if ( this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0 ) {
			this.timerService.stop();
		}
	}

	/**
	 * Initial notification setup
	 */
	private setup(): void {

		// Set start position (initially the exact same for every new notification)
		switch ( this.config.position.horizontal.position ) {
			case 'left':
				this.setStyle( 'left', `${ this.config.position.horizontal.distance }px` );
				break;
			case 'right':
				this.setStyle( 'right', `${ this.config.position.horizontal.distance }px` );
				break;
			case 'middle':
				this.setStyle( 'left', '50%' );
				this.setStyle( 'transform', 'translate3d( -50%, 0, 0 )' ); // Let's get the GPU handle some work as well (#perfmatters)
				break;
			default:
				throw new Error( `Notifier Error: "${ this.config.position.horizontal.position }" is not a valid horizontal position.` );
		}
		switch ( this.config.position.vertical.position ) {
			case 'top':
				this.setStyle( 'top', `${ this.config.position.vertical.distance }px` );
				break;
			case 'bottom':
				this.setStyle( 'bottom', `${ this.config.position.vertical.distance }px` );
				break;
			default:
				throw new Error( `Notifier Error: "${ this.config.position.vertical.position }" is not a valid vertical position.` );
		}

		// Add classes (responsible for visual design)
		this.addClass( `x-notifier__notification--${ this.notification.type }` );
		this.addClass( `x-notifier__notification--${ this.config.theme }` );

	}

	/**
	 * Helper: Set a notification element style
	 *
	 * @param {string} styleName  Name of the style
	 * @param {string} styleValue Value of the style
	 */
	private setStyle( styleName: string, styleValue: string ): void {
		this.renderer.setElementStyle( this.element, styleName, styleValue );
	}

	/**
	 * Helper: Add a class to the notification element
	 *
	 * @param {string} className Name of the class to add
	 */
	private addClass( className: string ): void {
		this.renderer.setElementClass( this.element, className, true );
	}

}
