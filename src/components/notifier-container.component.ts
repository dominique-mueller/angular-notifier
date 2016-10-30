import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NotifierService } from './../services/notifier.service';
import { NotifierQueueService } from './../services/notifier-queue.service';
import { NotifierNotificationComponent } from './notifier-notification.component';
import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierNotification } from './../models/notifier-notification.model';
import { NotifierAction, NotifierActionType } from './../models/notifier-action.model';

/**
 * Notifier container component
 */
@Component( {
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'x-notifier__container'
	},
	selector: 'x-notifier-container',
	template: `
		<ul>
			<li class="x-notifier__container-list" *ngFor="let notification of notifications; trackBy: notification?.id">
				<x-notifier-notification
					[notification]="notification"
					(ready)="onNotificationReady( $event )"
					(dismiss)="onNotificationDismiss( $event )">
				</x-notifier-notification>
			</li>
		</ul>`
} )
export class NotifierContainerComponent implements OnInit, OnDestroy {

	/**
	 * Change detector
	 */
	private readonly changeDetector: ChangeDetectorRef;

	/**
	 * Notifier queue service
	 */
	private readonly queueService: NotifierQueueService;

	/**
	 * Global configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * List of current notifications
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
	public constructor( changeDetector: ChangeDetectorRef,
						notifierService: NotifierService,
						notifierQueueService: NotifierQueueService ) {
		this.changeDetector = changeDetector;
		this.changeDetector.detach(); // Allows us to use our own custom change detection tree (#perfmatters)
		this.queueService = notifierQueueService;
		this.config = notifierService.getConfig();
		this.notifications = [];
	}

	/**
	 * Component initialization lifecycle hook, handles the incoming stream of actions
	 */
	public ngOnInit(): void {
		this.queueServiceSubscription = this.queueService.actionStream.subscribe( ( action: NotifierAction ) => {
			this.handleAction( action ).then( () => {
				this.queueService.continue();
			} );
		} );
	}

	/**
	 * Component destroy lifecycle hook, cleans up the observable subsciption
	 */
	public ngOnDestroy(): void {
		this.queueServiceSubscription.unsubscribe();
	}

	/**
	 * Handle click on a notification dismiss button
	 */
	public onNotificationDismiss( notificationId: string ): void {
		this.queueService.push( {
			payload: notificationId,
			type: NotifierActionType.HIDE
		} );
	}

	/**
	 * Handle the notification ready event
	 */
	public onNotificationReady( componentRef: NotifierNotificationComponent ): void {
		let currentNotification: NotifierNotification = this.notifications[ this.notifications.length - 1 ];
		currentNotification.component = componentRef; // Save component reference
		this.showNotification( currentNotification );
	}

	/**
	 * Maps action types to component methods, and then runs the correct one
	 */
	private handleAction( action: NotifierAction ): Promise<null> {
		switch ( action.type ) {
			case NotifierActionType.SHOW:
				return this.handleShowAction( action );
			case NotifierActionType.HIDE:
				return this.handleHideAction( action );
			case NotifierActionType.HIDE_OLDEST:
				return this.handleHideOldestAction( action );
			case NotifierActionType.HIDE_NEWEST:
				return this.handleHideNewestAction( action );
			case NotifierActionType.HIDE_ALL:
				return this.handleHideAllAction( action );
		}
	}

	/**
	 * Add a new notification to the list of notifications
	 */
	private handleShowAction( action: NotifierAction ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {
			this.tempPromiseResolver = resolve; // Save the promise resolve function so that it can be executed later by another function
			const newNotification: NotifierNotification = new NotifierNotification( action.payload );
			this.notifications = [ ...this.notifications, newNotification ]; // Immutable
			this.changeDetector.detectChanges(); // Run change detection because the notification list changed
		} );
	}

	/**
	 * Remove an existing notification from the list of notifications
	 */
	private handleHideAction( action: NotifierAction ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {

			// Are there any notifications?
			const numberOfNotifications: number = this.notifications.length;
			if ( numberOfNotifications === 0 ) {
				resolve(); // Done
			}

			// Does the 'requested' notification really exist?
			const notification: NotifierNotification | undefined = this.findNotificationById( action.payload );
			if ( typeof notification === 'undefined' ) {
				resolve(); // Done
			}

			// Is there only one notification in the list?
			if ( numberOfNotifications === 1 ) {
				this.hideNotification( notification ).then( resolve ); // Done
			} else {
				this.hideNotification( notification );
				const notificationIndex: number = this.findNotificationIndexById( action.payload );
				const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 0, notificationIndex );
				this.shiftNotifications( otherNotifications, notification.component.getHeight(), false ).then( resolve ); // Done
			}

		} );
	}

	/**
	 * Hide the oldest notification
	 */
	private handleHideOldestAction( action: NotifierAction ): Promise<null> {
		if ( this.notifications.length === 0 ) {
			return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => resolve ); // Done
		} else {
			action.payload = this.notifications[ 0 ].id;
			return this.handleHideAction( action );
		}
	}

	/**
	 * Hide the newest notification
	 */
	private handleHideNewestAction( action: NotifierAction ): Promise<null> {
		if ( this.notifications.length === 0 ) {
			return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => resolve ); // Done
		} else {
			action.payload = this.notifications[ this.notifications.length - 1 ].id;
			return this.handleHideAction( action );
		}
	}

	/**
	 * Hide all notifications
	 */
	private handleHideAllAction( action: NotifierAction ): Promise<null> {
		return new Promise<null>( ( resolve: ( value?: null ) => {}, reject: ( value?: null ) => {} ) => {

			const numberOfNotifications: number = this.notifications.length;
			if ( numberOfNotifications === 0 ) {
				resolve(); // Done
			}

			// Are animations enabled?
			if ( this.config.animations.hide.offset > 0 ) {

				for ( let i: number = numberOfNotifications - 1; i >= 0; i-- ) {
					const animOffsetMultiplier: number = this.config.position.verticalPosition === 'top' ? numberOfNotifications - 1 : i;
					setTimeout( () => {

						// Remove them directly (instead of using the hideNotification function)
						// This prevents the notification list of being changed before all notifications are fully animated out
						this.notifications[ i ].component.hide().then( () => {
							if ( ( this.config.position.verticalPosition === 'top' && i === 0 ) ||
								( this.config.position.verticalPosition === 'bottom' && i === numberOfNotifications - 1 ) ) {
								this.notifications = []; // Immutable
								this.changeDetector.detectChanges(); // Run change detection because the notification list changed
								resolve(); // Done
							}
						} );

					}, this.config.animations.hide.offset * animOffsetMultiplier );
				}

			} else {

				let notificationPromises: Array<Promise<null>> = [];
				for ( let i: number = numberOfNotifications - 1; i >= 0; i-- ) {
					notificationPromises.push( this.notifications[ i ].component.hide() );
				}
				Promise.all( notificationPromises ).then( () => {
					this.notifications = []; // Immutable
					this.changeDetector.detectChanges(); // Run change detection because the notification list changed
					resolve(); // Done
				} );

			}

		} );
	}

	/**
	 * Show notification
	 */
	private showNotification( notification: NotifierNotification ): void {

		// First notification in the list?
		if ( this.notifications.length === 1 ) {
			notification.component.show().then( this.tempPromiseResolver ); // Done
		} else {

			// Stacking enabled? (same as stacking value below 2)
			if ( this.config.behaviour.stacking === false || this.config.behaviour.stacking < 2 ) {
				this.hideNotification( this.notifications[ 0 ] ).then( () => {
					notification.component.show().then( this.tempPromiseResolver ); // Done
				} );
			} else {

				//  Are there now too many notifications?
				if ( this.notifications.length > this.config.behaviour.stacking ) {

					this.hideNotification( this.notifications[ 0 ] ); // Hide oldest notification
					const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 1, this.notifications.length - 1 );
					this.shiftNotifications( otherNotifications, notification.component.getHeight(), true );
					notification.component.show().then( this.tempPromiseResolver ); // Done

				} else {

					const otherNotifications: Array<NotifierNotification> = this.notifications.slice( 0, this.notifications.length - 1 );
					this.shiftNotifications( otherNotifications, notification.component.getHeight(), true );
					notification.component.show().then( this.tempPromiseResolver ); // Done

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
				this.notifications = this.notifications.filter( ( currentNotification: NotifierNotification ) => { // Immutable
					return currentNotification.component !== notification.component;
				} );
				this.changeDetector.detectChanges(); // Run change detection because the notification list changed
				resolve(); // Done
			} );
		} );
	}

	/**
	 * Shift notifications
	 */
	private shiftNotifications( notifications: Array<NotifierNotification>, distance: number, shiftToMakePlace: boolean ): Promise<null> {
		let notificationPromises: Array<Promise<null>> = [];
		for ( let notification of notifications ) {
			notificationPromises.push( notification.component.shift( distance, shiftToMakePlace ) );
		}
		return Promise.all( notificationPromises ); // Done
	}

	/**
	 * Helper: Find a notification by its ID
	 */
	private findNotificationById( notificationId: string ): NotifierNotification | undefined {
		return this.notifications.find( ( currentNotification: NotifierNotification ) => currentNotification.id === notificationId );
	}

	/**
	 * Helper: Find a notification index by its ID
	 */
	private findNotificationIndexById( notificationId: string ): number | undefined {
		return this.notifications.findIndex( ( currentNotification: NotifierNotification ) => currentNotification.id === notificationId );
	}

}
