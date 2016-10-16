import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Optional, Output, Renderer } from '@angular/core';

import { NotifierConfigGlobal } from './../models/notifier-config-global.model';
import { NotifierNotification } from './../models/notifier-notification.model';

/**
 * Notifier notification component
 */
@Component( {
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
	 * Input: Notification object
	 */
	@Input()
	public notification: NotifierNotification;

	/**
	 * Output: Initialize event, emits a reference to this component
	 */
	@Output()
	public init: EventEmitter<NotifierNotificationComponent>;

	/**
	 * Output: Handle click on dismiss button
	 */
	@Output()
	public dismiss: EventEmitter<NotifierNotification>;

	/**
	 * Current notification height, calculated and cached here (#perfmatters)
	 */
	public currentElementHeight: number;

	/**
	 * Global configuration
	 */
	private config: NotifierConfigGlobal;

	/**
	 * Native element reference, used for manipulating DOM properties
	 */
	private element: any; // Similar to an HTMLElement

	/**
	 * Angular renderer, used to preserve the overall DOM abstraction (DOM independence)
	 */
	private renderer: Renderer;

	/**
	 * Current notification shift, calculated and cached here (#perfmatters)
	 */
	private currentElementShift: number;

	/**
	 * Constructor
	 * @param {ElementRef} elementRef Component element reference
	 * @param {Renderer}   renderer   Angular rendering service
	 */
	public constructor( elementRef: ElementRef, renderer: Renderer, @Optional() config: NotifierConfigGlobal ) {
		this.config = config === null ? new NotifierConfigGlobal() : config;
		this.init = new EventEmitter<NotifierNotificationComponent>();
		this.dismiss = new EventEmitter<NotifierNotification>();
		this.element = elementRef.nativeElement;
		this.renderer = renderer;
		this.currentElementShift = 0;
	}

	/**
	 * Component after view init lifecycle hook
	 * Setup this component, then communicate to the parent that we're done with the initial setup
	 */
	public ngAfterViewInit(): void {
		this.setup();
		this.currentElementHeight = this.element.offsetHeight; // Calculate current notification height and cache it (#perfmatters)
		this.init.emit( this );
	}

	/**
	 * Show (aniamte in) this notification
	 * @returns {Promise<null>} Empty promise, resolved when finished
	 */
	public show(): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
			this.renderer.setElementStyle( this.element, 'visibility', 'visible' );
			resolve();
		} );
	}

	/**
	 * Hide (animate out) notification
	 * @returns {Promise<null>} Empty promise, resolved when finished
	 */
	public hide(): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
			resolve();
		} );
	}

	/**
	 * Shift (animate move) notification
	 */
	public shift( distance: number, shiftToMakePlace: boolean ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {

			// Calculate new position (position after the shift)
			let newElementShift: number;
			switch ( this.config.position.verticalPosition ) { // TODO: Maybe if-else ??
				case 'top':
					if ( shiftToMakePlace ) {
						newElementShift = this.currentElementShift + distance + this.config.position.verticalGap;
					} else {
						newElementShift = this.currentElementShift - distance - this.config.position.verticalGap;
					}
					break;
				case 'bottom':
					if ( shiftToMakePlace ) {
						newElementShift = this.currentElementShift - distance - this.config.position.verticalGap;
					} else {
						newElementShift = this.currentElementShift + distance + this.config.position.verticalGap;
					}
			}
			let horizontalPosition: string = this.config.position.horizontalPosition === 'middle' ? '-50%' : '0';

			// Shift
			this.renderer.setElementStyle( this.element, 'transform', `translate3d( ${ horizontalPosition }, ${ newElementShift }px, 0 )` );
			this.currentElementShift = newElementShift;
			resolve(); // DONE

		} );
	}

	/**
	 * Handle click on dismiss button
	 * Only emits event to parent component
	 */
	public onClickDismiss(): void {
		this.dismiss.emit( this.notification );
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
