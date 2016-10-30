import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NotifierQueueService } from './../services/notifier-queue.service';
import { NotifierNotificationComponent } from './notifier-notification.component';
import { NotifierConfigGlobal } from './../models/notifier-config-global.model';
import { NotifierNotification } from './../models/notifier-notification.model';
import { NotifierAction, NotifierActionType } from './../models/notifier-action.model';

/**
 * Notifier container component
 */
@Component( {
	host: {
		class: 'x-notifier__container'
	},
	selector: 'x-notifier-container',
	template: `
		<ul>
			<li class="x-notifier__container-list" *ngFor="let notification of notifications">
				<x-notifier-notification
					[notification]="notification"
					(init)="onComponentInit( $event )"
					(dismiss)="onClickDismiss( $event )">
				</x-notifier-notification>
			</li>
		</ul>`
} )
export class NotifierContainerComponent implements OnInit, OnDestroy {

	/**
	 * Global configuration
	 */
	private config: NotifierConfigGlobal;

	/**
	 * Notifier queue service
	 */
	private queueService: NotifierQueueService;

	/**
	 * List of currently visible notifications
	 */
	private notifications: Array<NotifierNotification>;

	/**
	 * Queue service observable subscription (used for cleanup later on)
	 */
	private queueServiceSubscription: Subscription;

	/**
	 * Promise resolve function reference, temporarily used while the notification child component gets created
	 */
	private tempPromiseResolver: ( value?: null ) => {};

	/**
	 * Constructor
	 */
	public constructor( notifierQueueService: NotifierQueueService, @Optional() config: NotifierConfigGlobal ) {
		this.config = config === null ? new NotifierConfigGlobal() : config;
		this.queueService = notifierQueueService;
		this.notifications = [];
	}

	/**
	 * Component initialization lifecycle hook
	 * Handles the incoming stream of actions, and also communicates back when an action is finished
	 */
	public ngOnInit(): void {
		this.queueServiceSubscription = this.queueService.actionStream.subscribe( ( action: NotifierAction ) => {
			this.handleNewAction( action ).then( () => {
				this.queueService.continue();
			} );
		} );
	}

	/**
	 * Component destroy lifecycle hook
	 * Cleans up observable subsciption
	 */
	public ngOnDestroy(): void {
		this.queueServiceSubscription.unsubscribe();
	}

	/**
	 * Handle click on a notification dismiss button
	 * @param {NotifierNotification} notification
	 */
	public onClickDismiss( notification: NotifierNotification ): void {
		this.queueService.push( {
			payload: notification,
			type: NotifierActionType.CLEAR
		} );
	}

	/**
	 * Redirect ... event handler
	 */
	public onComponentInit( componentRef: NotifierNotificationComponent ): void {
		let currentNotification: NotifierNotification = this.notifications[ this.notifications.length - 1 ];
		currentNotification.component = componentRef; // Save component Ref
		this.showNotification( currentNotification );
	};

	/**
	 * Maps action types to component methods, and then runs the correct one
	 */
	private handleNewAction( action: NotifierAction ): Promise<any> {
		switch ( action.type ) {
			case NotifierActionType.SHOW:
				return this.addNotification( action );
			case NotifierActionType.CLEAR:
				return this.removeNotification( action );
		}
	}

	/**
	 * Add a new notification to the list of notifications
	 * @param   {NotifierAction} action Action object
	 * @returns {Promise<null>}         Empty Promise, resolved when finished
	 */
	private addNotification( action: NotifierAction ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
			let notification: NotifierNotification = new NotifierNotification( action.payload );
			this.tempPromiseResolver = resolve; // Gets resolved when the notification is finally visible
			this.notifications.push( notification );
		} );
	}

	/**
	 * Remove notification
	 */
	private removeNotification( action: NotifierAction ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {

			// 1. Decision: Only one notification in the list?
			if ( this.notifications.length === 1 ) {
				this.hideNotification( action.payload ).then( resolve ); // DONE
			} else {
				this.hideNotification( action.payload );
				const notificationIndex: number = this.notifications.findIndex( ( notification: NotifierNotification ) => {
					return notification.component === action.payload.component;
				} );
				const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 0, notificationIndex );
				this.shiftNotifications( otherNotifications, action.payload.component.elementHeight, false ).then( resolve );
			}

		} );
	}

	/**
	 * Show notification
	 */
	private showNotification( notification: NotifierNotification ): void {

		// 1. Decision: First notification in the list?
		if ( this.notifications.length === 1 ) {
			notification.component.show().then( this.tempPromiseResolver );
		} else {

			// 2. Decision: Stacking enabled? (same as stacking value below 2)
			if ( this.config.behaviour.stacking === false || this.config.behaviour.stacking < 2 ) {
				this.hideNotification( this.notifications[ 0 ] ).then( () => {
					notification.component.show().then( this.tempPromiseResolver );
				} );
			} else {

				// 3. Decision: Are there now too many notifications?
				if ( this.notifications.length > this.config.behaviour.stacking ) {

					this.hideNotification( this.notifications[ 0 ] ); // Hide oldest notification
					const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 1, this.notifications.length - 1 );
					this.shiftNotifications( otherNotifications, notification.component.elementHeight, true );
					notification.component.show().then( this.tempPromiseResolver ); // DONE

				} else {

					const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 0, this.notifications.length - 1 );
					this.shiftNotifications( otherNotifications, notification.component.elementHeight, true );
					notification.component.show().then( this.tempPromiseResolver ); // DONE

				}

			}

		}

	}

	/**
	 * Hide notification
	 */
	private hideNotification( notification: NotifierNotification ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
			notification.component.hide().then( () => {
				this.notifications = this.notifications.filter( ( currentNotification: NotifierNotification ) => {
					return currentNotification.component !== notification.component;
				} );
				resolve(); // DONE
			} );
		} );
	}

	/**
	 * Shift notifications
	 */
	private shiftNotifications( notifications: Array<NotifierNotification>, distance: number, shiftToMakePlace: boolean ): Promise<null> {
		let shiftPromises: Array<Promise<null>> = [];
		for ( let notification of notifications ) {
			shiftPromises.push( notification.component.shift( distance, shiftToMakePlace ) );
		}
		return Promise.all( shiftPromises ); // DONE
	}

}
