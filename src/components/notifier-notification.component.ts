import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer }
	from '@angular/core';

import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierService } from './../services/notifier.service';
import { NotifierAnimationService } from './../services/notifier-animation.service';
import { NoifierAnimationData } from './../models/notifier-animation.model';
import { NotifierNotification } from './../models/notifier-notification.model';

/**
 * Notifier notification component
 */
@Component( {
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'x-notifier__notification'
	},
	selector: 'x-notifier-notification',
	template: `
		<p>
			{{ notification.message }}
			<button (click)="onClickDismiss()">X</button>
		</p>
		`
} )
export class NotifierNotificationComponent implements AfterViewInit {

	/**
	 * Input: Notification object, contains all details needed to construct the notification and its content
	 */
	@Input()
	public notification: NotifierNotification;

	/**
	 * Output: Initialize event, emits a reference to this notification component
	 */
	@Output()
	public ready: EventEmitter<NotifierNotificationComponent>;

	/**
	 * Output: Dismiss event, handles the click on the dismiss button
	 */
	@Output()
	public dismiss: EventEmitter<string>;

	/**
	 * Notifier animation service
	 */
	private readonly animationService: NotifierAnimationService;

	/**
	 * Angular renderer, used to preserve the overall DOM abstraction (DOM independence)
	 */
	private readonly renderer: Renderer;

	/**
	 * Global configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * Native element reference, used for manipulating DOM properties
	 */
	private readonly element: any; // Similar to an HTMLElement, but misses web animations

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
	 */
	public constructor( elementRef: ElementRef,
						renderer: Renderer,
						notifierService: NotifierService,
						animationService: NotifierAnimationService, ) {
		this.config = notifierService.getConfig();
		this.ready = new EventEmitter<NotifierNotificationComponent>();
		this.dismiss = new EventEmitter<string>();
		this.element = elementRef.nativeElement;
		this.animationService = animationService;
		this.renderer = renderer;
		this.elementShift = 0;
	}

	/**
	 * Component after view init lifecycle hook
	 * Setup this component, then communicate to the parent that we're done with the initial setup
	 */
	public ngAfterViewInit(): void {
		this.setup();
		this.elementHeight = this.element.offsetHeight;
		this.elementWidth = this.element.offsetWidth;
		this.ready.emit( this );
	}

	/**
	 * Get the notifier config
	 */
	public getConfig(): NotifierConfig {
		return this.config;
	}

	/**
	 * Get notification height
	 */
	public getHeight(): number {
		return this.elementHeight;
	}

	/**
	 * Get notification width
	 */
	public getWidth(): number {
		return this.elementWidth;
	}

	/**
	 * Get notification shift
	 */
	public getShift(): number {
		return this.elementShift;
	}

	/**
	 * Show (aniamte in) this notification
	 */
	public show(): Promise<null> {

		// Decision: Are animations enabled?
		if ( this.config.animations.enabled ) {
			const animationData: NoifierAnimationData = this.animationService.getAnimationData( 'in', this.notification );
			for ( let attribute in animationData.keyframes[ 0 ] ) { // Set pre-animation styles to prevent flickering
				this.renderer.setElementStyle( this.element, attribute, animationData.keyframes[ 0 ][ attribute ] );
			}
			this.renderer.setElementStyle( this.element, 'visibility', 'visible' );
			return this.element.animate( animationData.keyframes, animationData.options ).finished; // Returns a promise
		} else {
			return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
				this.renderer.setElementStyle( this.element, 'visibility', 'visible' );
				resolve();
			} );
		}

	}

	/**
	 * Hide (animate out) notification
	 */
	public hide(): Promise<null> {

		// Decision: Are animations enabled?
		if ( this.config.animations.enabled ) {
			const animationData: NoifierAnimationData = this.animationService.getAnimationData( 'out', this.notification );
			return this.element.animate( animationData.keyframes, animationData.options ).finished; // Returns a promise
		} else {
			return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
				resolve();
			} );
		}

	}

	/**
	 * Shift (animate move) notification
	 */
	public shift( distance: number, shiftToMakePlace: boolean ): Promise<null> {

		// Calculate new position (position after the shift)
		let newElementShift: number;
		switch ( this.config.position.verticalPosition ) {
			case 'top':
				if ( shiftToMakePlace ) {
					newElementShift = this.elementShift + distance + this.config.position.verticalGap;
				} else {
					newElementShift = this.elementShift - distance - this.config.position.verticalGap;
				}
				break;
			case 'bottom':
				if ( shiftToMakePlace ) {
					newElementShift = this.elementShift - distance - this.config.position.verticalGap;
				} else {
					newElementShift = this.elementShift + distance + this.config.position.verticalGap;
				}
				break;
		}
		const horizontalPosition: string = this.config.position.horizontalPosition === 'middle' ? '-50%' : '0';

		// Decision: Are animations enabled?
		if ( this.config.animations.enabled ) {
			const animationData: NoifierAnimationData = { // TODO: Extract into animation service
				keyframes: [
					{
						transform: `translate3d( ${ horizontalPosition }, ${ this.elementShift }px, 0 )`
					},
					{
						transform: `translate3d( ${ horizontalPosition }, ${ newElementShift }px, 0 )`
					}
				],
				options: {
					delay: 10,
					duration: this.config.animations.shift.speed,
					easing: this.config.animations.shift.easing,
					fill: 'forwards'
				}
			};
			this.elementShift = newElementShift;
			return this.element.animate( animationData.keyframes, animationData.options ).finished; // Returns a promise
		} else {
			return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
				this.renderer.setElementStyle( this.element, 'transform', `translate3d( ${ horizontalPosition }, ${ newElementShift }px, 0 )` );
				this.elementShift = newElementShift;
				resolve(); // Done
			} );
		}

	}

	/**
	 * Handle click on dismiss button
	 * Only emits event to parent component
	 */
	public onClickDismiss(): void {
		this.dismiss.emit( this.notification.id );
	}

	/**
	 * Initial notification setup
	 */
	private setup(): void {

		// Set start position (initially the exact same for every new notification)
		switch ( this.config.position.horizontalPosition ) {
			case 'left':
				this.renderer.setElementStyle( this.element, 'left', `${ this.config.position.horizontalDistance }px` );
				break;
			case 'right':
				this.renderer.setElementStyle( this.element, 'right', `${ this.config.position.horizontalDistance }px` );
				break;
			case 'middle':
				this.renderer.setElementStyle( this.element, 'left', '50%' );
				this.renderer.setElementStyle( this.element, 'transform', 'translate3d( -50%, 0, 0 )' ); // GPU hack (#perfmatters)
				break;
		}
		switch ( this.config.position.verticalPosition ) {
			case 'top':
				this.renderer.setElementStyle( this.element, 'top', `${ this.config.position.verticalDistance }px` );
				break;
			case 'bottom':
				this.renderer.setElementStyle( this.element, 'bottom', `${ this.config.position.verticalDistance }px` );
				break;
		}

		// Add classes (responsible for visual design)
		this.renderer.setElementClass( this.element, `x-notifier__notification--${ this.notification.type }`, true );
		this.renderer.setElementClass( this.element, `x-notifier__notification--${ this.config.theme }`, true );

	}

}
