import { NotifierNotificationComponent } from './../components/notifier-notification.component';

/**
 * Notification model
 */
export class NotifierNotification {
	public id: string;
	public type: string;
	public message: string;
	public component: NotifierNotificationComponent;

	/**
	 * Constructor
	 */
	public constructor( options: NotifierNotificationOptions ) {

		// Set custom options
		Object.assign( this, options );

		// If not defined, create a unique notification ID.
		// - The ID generation relies on the current datetime, in praticular the moment this notification gets constructed, in ms.
		// - Concurrency, and thus two IDs which are the same, is not an issue due to the action queue concept
		if ( typeof options.id === 'undefined' ) {
			this.id = `ID_${ new Date().getTime() }`;
		}

	}

}

/**
 * Notifiction options model
 */
export interface NotifierNotificationOptions {
	id?: string;
	type: string;
	message: string;
}
