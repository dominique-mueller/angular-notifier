import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { NotifierAction } from '../models/notifier-action.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierQueueService } from '../services/notifier-queue.service';
import { NotifierService } from '../services/notifier.service';
import { NotifierNotificationComponent } from './notifier-notification.component';

/**
 * Notifier container component
 * ----------------------------
 * This component acts as a wrapper for all notification components; consequently, it is responsible for creating a new notification
 * component and removing an existing notification component. Being more precicely, it also handles side effects of those actions, such as
 * shifting or even completely removing other notifications as well. Overall, this components handles actions coming from the queue service
 * by subscribing to its action stream.
 *
 * Technical sidenote:
 * This component has to be used somewhere in an application to work; it will not inject and create itself automatically, primarily in order
 * to not break the Angular AoT compilation. Moreover, this component (and also the notification components) set their change detection
 * strategy onPush, which means that we handle change detection manually in order to get the best performance. (#perfmatters)
 */
@Component( {
	changeDetection: ChangeDetectionStrategy.OnPush, // (#perfmatters)
	host: {
		class: 'notifier__container'
	},
	selector: 'notifier-container',
	templateUrl: './notifier-container.component.html'
} )
export class NotifierContainerComponent implements OnDestroy {

	/**
	 * List of currently somewhat active notifications
	 */
	public notifications: Array<NotifierNotification>;

	/**
	 * Change detector
	 */
	private readonly changeDetector: ChangeDetectorRef;

	/**
	 * Notifier queue service
	 */
	private readonly queueService: NotifierQueueService;

	/**
	 * Notifier configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * Queue service observable subscription (saved for cleanup)
	 */
	private queueServiceSubscription: Subscription;

	/**
	 * Promise resolve function reference, temporarily used while the notification child component gets created
	 */
	private tempPromiseResolver: () => void;

	/**
	 * Constructor
	 *
	 * @param changeDetector       Change detector, used for manually triggering change detection runs
	 * @param notifierQueueService Notifier queue service
	 * @param notifierService      Notifier service
	 */
	public constructor( changeDetector: ChangeDetectorRef, notifierQueueService: NotifierQueueService, notifierService: NotifierService ) {
		this.changeDetector = changeDetector;
		this.queueService = notifierQueueService;
		this.config = notifierService.getConfig();
		this.notifications = [];

		// Connects this component up to the action queue, then handle incoming actions
		this.queueServiceSubscription = this.queueService.actionStream.subscribe( ( action: NotifierAction ) => {
			this.handleAction( action ).then( () => {
				this.queueService.continue();
			} );
		} );

	}

	/**
	 * Component destroyment lifecycle hook, cleans up the observable subsciption
	 */
	public ngOnDestroy(): void {
		if ( this.queueServiceSubscription ) {
			this.queueServiceSubscription.unsubscribe();
		}
	}

	/**
	 * Notification identifier, used as the ngFor trackby function
	 *
	 * @param   index        Index
	 * @param   notification Notifier notification
	 * @returns Notification ID as the unique identnfier
	 */
	public identifyNotification( index: number, notification: NotifierNotification ): string {
		return notification.id;
	}

	/**
	 * Event handler, handles clicks on notification dismiss buttons
	 *
	 * @param notificationId ID of the notification to dismiss
	 */
	public onNotificationDismiss( notificationId: string ): void {
		this.queueService.push( {
			payload: notificationId,
			type: 'HIDE'
		} );
	}

	/**
	 * Event handler, handles notification ready events
	 *
	 * @param notificationComponent Notification component reference
	 */
	public onNotificationReady( notificationComponent: NotifierNotificationComponent ): void {
		let currentNotification: NotifierNotification = this.notifications[ this.notifications.length - 1 ]; // Get the latest notification
		currentNotification.component = notificationComponent; // Save the new omponent reference
		this.continueHandleShowAction( currentNotification ); // Continue with handling the show action
	}

	/**
	 * Handle incoming actions by mapping action types to methods, and then running them
	 *
	 * @param   action Action object
	 * @returns Promise, resolved when done
	 */
	private handleAction( action: NotifierAction ): Promise<undefined> {
		switch ( action.type ) { // TODO: Maybe a map (actionType -> class method) is a cleaner solution here?
			case 'SHOW':
				return this.handleShowAction( action );
			case 'HIDE':
				return this.handleHideAction( action );
			case 'HIDE_OLDEST':
				return this.handleHideOldestAction( action );
			case 'HIDE_NEWEST':
				return this.handleHideNewestAction( action );
			case 'HIDE_ALL':
				return this.handleHideAllAction( action );
			default:
				return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
					resolve(); // Ignore unknown action types
				} );
		}
	}

	/**
	 * Show a new notification
	 *
	 * We simply add the notification to the list, and then wait until its properly initialized / created / rendered.
	 *
	 * @param   action Action object
	 * @returns Promise, resolved when done
	 */
	private handleShowAction( action: NotifierAction ): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
			this.tempPromiseResolver = resolve; // Save the promise resolve function so that it can be called later on by another method
			this.addNotificationToList( new NotifierNotification( action.payload ) );
		} );
	}

	/**
	 * Continue to show a new notification (after the notification components is initialized / created / rendered).
	 *
	 * If this is the first (and thus only) notification, we can simply show it. Otherwhise, if stacking is disabled (or a low value), we
	 * switch out notifications, in particular we hide the existing one, and then show our new one. Yet, if stacking is enabled, we first
	 * shift all older notifications, and then show our new notification. In addition, if there are too many notification on the screen,
	 * we hide the oldest one first. Furthermore, if configured, animation overlapping is applied.
	 *
	 * @param notification New notification to show
	 */
	private continueHandleShowAction( notification: NotifierNotification ): void {

		// First (which means only one) notification in the list?
		const numberOfNotifications: number = this.notifications.length;
		if ( numberOfNotifications === 1 ) {
			notification.component.show().then( this.tempPromiseResolver ); // Done
		} else {

			const implicitStackingLimit: number = 2;

			// Stacking enabled? (stacking value below 2 means stacking is disabled)
			if ( this.config.behaviour.stacking === false || this.config.behaviour.stacking < implicitStackingLimit ) {
				this.notifications[ 0 ].component.hide().then( () => {
					this.removeNotificationFromList( this.notifications[ 0 ] );
					notification.component.show().then( this.tempPromiseResolver ); // Done
				} );
			} else {

				const stepPromises: Array<Promise<undefined>> = [];

				// Are there now too many notifications?
				if ( numberOfNotifications > this.config.behaviour.stacking ) {

					const oldNotifications: Array<NotifierNotification> = this.notifications.slice( 1, numberOfNotifications - 1 );

					// Are animations enabled?
					if ( this.config.animations.enabled ) {

						// Is animation overlap enabled?
						if ( this.config.animations.overlap !== false && this.config.animations.overlap > 0 ) {
							stepPromises.push( this.notifications[ 0 ].component.hide() );
							setTimeout( () => {
								stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ) );
							}, this.config.animations.hide.speed - this.config.animations.overlap );
							setTimeout( () => {
								stepPromises.push( notification.component.show() );
							}, this.config.animations.hide.speed + this.config.animations.shift.speed - this.config.animations.overlap );
						} else {
							stepPromises.push( new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
								this.notifications[ 0 ].component.hide().then( () => {
									this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ).then( () => {
										notification.component.show().then( resolve );
									} );
								} );
							} ) );
						}

					} else {
						stepPromises.push( this.notifications[ 0 ].component.hide() );
						stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ) );
						stepPromises.push( notification.component.show() );
					}

				} else {

					const oldNotifications: Array<NotifierNotification> = this.notifications.slice( 0, numberOfNotifications - 1 );

					// Are animations enabled?
					if ( this.config.animations.enabled ) {

						// Is animation overlap enabled?
						if ( this.config.animations.overlap !== false && this.config.animations.overlap > 0 ) {
							stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ) );
							setTimeout( () => {
								stepPromises.push( notification.component.show() );
							}, this.config.animations.shift.speed - this.config.animations.overlap );
						} else {
							stepPromises.push( new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
								this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ).then( () => {
									notification.component.show().then( resolve );
								} );
							} ) );
						}

					} else {
						stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), true ) );
						stepPromises.push( notification.component.show() );
					}

				}

				Promise.all( stepPromises ).then( () => {
					if ( numberOfNotifications > this.config.behaviour.stacking ) {
						this.removeNotificationFromList( this.notifications[ 0 ] );
					}
					this.tempPromiseResolver();
				} ); // Done

			}

		}

	}

	/**
	 * Hide an existing notification
	 *
	 * Fist, we skip everything if there are no notifications at all, or the given notification does not exist. Then, we hide the given
	 * notification. If there exist older notifications, we then shift them around to fill the gap. Once both hiding the given notification
	 * and shifting the older notificaitons is done, the given notification gets finally removed (from the DOM).
	 *
	 * @param   action Action object, payload contains the notification ID
	 * @returns Promise, resolved when done
	 */
	private handleHideAction( action: NotifierAction ): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			const stepPromises: Array<Promise<undefined>> = [];

			// Does the notification exist / are there even any notifications? (let's prevent accidential errors)
			const notification: NotifierNotification | undefined = this.findNotificationById( action.payload );
			if ( notification === undefined ) {
				resolve();
				return;
			}

			// Get older notifications
			const notificationIndex: number | undefined = this.findNotificationIndexById( action.payload );
			if ( notificationIndex === undefined ) {
				resolve();
				return;
			}
			const oldNotifications: Array<NotifierNotification> = this.notifications.slice( 0, notificationIndex );

			// Do older notifications exist, and thus do we need to shift other notifications as a consequence?
			if ( oldNotifications.length > 0 ) {

				// Are animations enabled?
				if ( this.config.animations.enabled && this.config.animations.hide.speed > 0 ) {

					// Is animation overlap enabled?
					if ( this.config.animations.overlap !== false && this.config.animations.overlap > 0 ) {
						stepPromises.push( notification.component.hide() );
						setTimeout( () => {
							stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), false ) );
						}, this.config.animations.hide.speed - this.config.animations.overlap );
					} else {
						notification.component.hide().then( () => {
							stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), false ) );
						} );
					}
				} else {
					stepPromises.push( notification.component.hide() );
					stepPromises.push( this.shiftNotifications( oldNotifications, notification.component.getHeight(), false ) );
				}

			} else {

				stepPromises.push( notification.component.hide() );

			}

			// Wait until both hiding and shifting is done, then remove the notification from the list
			Promise.all( stepPromises ).then( () => {
				this.removeNotificationFromList( notification );
				resolve(); // Done
			} );

		} );

	}

	/**
	 * Hide the oldest notification (bridge to handleHideAction)
	 *
	 * @param   action Action object
	 * @returns Promise, resolved when done
	 */
	private handleHideOldestAction( action: NotifierAction ): Promise<undefined> {

		// Are there any notifications? (prevent accidential errors)
		if ( this.notifications.length === 0 ) {
			return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
				resolve();
			} ); // Done
		} else {
			action.payload = this.notifications[ 0 ].id;
			return this.handleHideAction( action );
		}

	}

	/**
	 * Hide the newest notification (bridge to handleHideAction)
	 *
	 * @param   action Action object
	 * @returns Promise, resolved when done
	 */
	private handleHideNewestAction( action: NotifierAction ): Promise<undefined> {

		// Are there any notifications? (prevent accidential errors)
		if ( this.notifications.length === 0 ) {
			return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {
				resolve();
			} ); // Done
		} else {
			action.payload = this.notifications[ this.notifications.length - 1 ].id;
			return this.handleHideAction( action );
		}

	}

	/**
	 * Hide all notifications at once
	 *
	 * @param   action Action object
	 * @returns Promise, resolved when done
	 */
	private handleHideAllAction( action: NotifierAction ): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			// Are there any notifications? (prevent accidential errors)
			const numberOfNotifications: number = this.notifications.length;
			if ( numberOfNotifications === 0 ) {
				resolve(); // Done
				return;
			}

			// Are animations enabled?
			if ( this.config.animations.enabled && this.config.animations.hide.speed > 0 && this.config.animations.hide.offset !== false &&
				this.config.animations.hide.offset > 0 ) {

				for ( let i: number = numberOfNotifications - 1; i >= 0; i-- ) {
					const animationOffset: number = this.config.position.vertical.position === 'top' ? numberOfNotifications - 1 : i;
					setTimeout( () => {
						this.notifications[ i ].component.hide().then( () => {

							// Are we done here, was this the last notification to be hidden?
							if ( ( this.config.position.vertical.position === 'top' && i === 0 ) ||
								( this.config.position.vertical.position === 'bottom' && i === numberOfNotifications - 1 ) ) {
								this.removeAllNotificationsFromList();
								resolve(); // Done
							}

						} );
					}, this.config.animations.hide.offset * animationOffset );
				}

			} else {

				let stepPromises: Array<Promise<undefined>> = [];
				for ( let i: number = numberOfNotifications - 1; i >= 0; i-- ) {
					stepPromises.push( this.notifications[ i ].component.hide() );
				}
				Promise.all( stepPromises ).then( () => {
					this.removeAllNotificationsFromList();
					resolve(); // Done
				} );

			}

		} );
	}

	/**
	 * Shift multiple notifications at once
	 *
	 * @param   notifications List containing the notifications to be shifted
	 * @param   distance      Distance to shift (in px)
	 * @param   toMakePlace   Flag, defining in which direciton to shift
	 * @returns Promise, resolved when done
	 */
	private shiftNotifications( notifications: Array<NotifierNotification>, distance: number, toMakePlace: boolean ): Promise<undefined> {
		return new Promise<undefined>( ( resolve: () => void, reject: () => void ) => {

			// Are there any notifications to shift?
			if ( notifications.length === 0 ) {
				resolve();
				return;
			}

			let notificationPromises: Array<Promise<undefined>> = [];
			for ( let i: number = notifications.length - 1; i >= 0; i-- ) {
				notificationPromises.push( notifications[ i ].component.shift( distance, toMakePlace ) );
			}
			Promise.all( notificationPromises ).then( resolve ); // Done

		} );
	}

	/**
	 * Add a new notification to the list of notifications (triggers change detection)
	 *
	 * @param notification Notification to add to the list of notifications
	 */
	private addNotificationToList( notification: NotifierNotification ): void {
		this.notifications.push( notification );
		this.changeDetector.markForCheck(); // Run change detection because the notification list changed
	}

	/**
	 * Remove an existing notification from the list of notifications (triggers change detection)
	 *
	 * @param notification Notification to be removed from the list of notifications
	 */
	private removeNotificationFromList( notification: NotifierNotification ): void {
		this.notifications =
			this.notifications.filter( ( item: NotifierNotification ) => item.component !== notification.component );
		this.changeDetector.markForCheck(); // Run change detection because the notification list changed
	}

	/**
	 * Remove all notifications from the list (triggers change detection)
	 */
	private removeAllNotificationsFromList(): void {
		this.notifications = [];
		this.changeDetector.markForCheck(); // Run change detection because the notification list changed
	}

	/**
	 * Helper: Find a notification in the notification list by a given notification ID
	 *
	 * @param   notificationId Notification ID, used for finding notification
	 * @returns Notification, undefined if not found
	 */
	private findNotificationById( notificationId: string ): NotifierNotification | undefined {
		return this.notifications.find( ( currentNotification: NotifierNotification ) => currentNotification.id === notificationId );
	}

	/**
	 * Helper: Find a notification's index by a given notification ID
	 *
	 * @param   notificationId Notification ID, used for finding a notification's index
	 * @returns Notification index, undefined if not found
	 */
	private findNotificationIndexById( notificationId: string ): number | undefined {
		const notificationIndex: number =
			this.notifications.findIndex( ( currentNotification: NotifierNotification ) => currentNotification.id === notificationId );
		return ( notificationIndex !== -1 ? notificationIndex : undefined );
	}

}
