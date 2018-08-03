import { Component, ViewChild } from '@angular/core';

import { NotifierService } from './../lib/index';

/**
 * App component
 */
@Component({
	host: {
		class: 'app'
	},
	selector: 'app',
	template: `
		<h1>"angular-notifier" demo</h1>

		<h2>Show notifications</h2>
		<button class="button button--primary" (click)="showNotification( 'default', 'Good evening, you lovely person!' )">
			Default me!
		</button>
		<button class="button button--primary" (click)="showNotification( 'info', 'This library is built on top of Angular 2.' )">
			Info me!
		</button>
		<button class="button button--primary" (click)="showNotification( 'success', 'Notification successfully opened.' )">
			Success me!
		</button>
		<button class="button button--primary" (click)="showNotification( 'warning', 'Warning! But not an error! Just a warning!' )">
			Warning me!
		</button>
		<button class="button button--primary" (click)="showNotification( 'error', 'Whoops, something went wrong. Probably.' )">
			Error me!
		</button>
		<button class="button button--primary" (click)="showCustomNotificationTemplate( 'info', 'This is a custom notification template' )">
			Custom notification
		</button>

		<h2>Hide notifications</h2>
		<button class="button button--secondary" (click)="hideAllNotifications()">
			Hide all notifications!
		</button>
		<button class="button button--secondary" (click)="hideOldestNotification()">
			Hide oldest notification!
		</button>
		<button class="button button--secondary" (click)="hideNewestNotification()">
			Hide newest notification!
		</button>

		<h2>Show & hide a specific notification</h2>
		<button class="button button--primary" (click)="showSpecificNotification( 'default', 'Hello, you lovely person!', 'ID_TEST' )">
			Show notification with ID named 'ID_TEST'
		</button>
		<button class="button button--secondary" (click)="hideSpecificNotification( 'ID_TEST' )">
			Hide notification with ID named 'ID_TEST'
		</button>

		<notifier-container></notifier-container>

		<ng-template #customTemplate let-notification="notification">
			<div>
				<strong>{{ notification.type}}:</strong> {{ notification.message }}
			</div>
		</ng-template>

	`
})
export class AppComponent {
	@ViewChild('customTemplate') customNotificationTmpl;

	/**
	 * Notifier service
	 */
	private notifier: NotifierService;

	/**
	 * Constructor
	 *
	 * @param {NotifierService} notifier Notifier service
	 */
	public constructor(notifier: NotifierService) {
		this.notifier = notifier;
	}

	/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public showNotification(type: string, message: string): void {
		this.notifier.notify(type, message);
	}

	/**
	 * Hide oldest notification
	 */
	public hideOldestNotification(): void {
		this.notifier.hideOldest();
	}

	/**
	 * Hide newest notification
	 */
	public hideNewestNotification(): void {
		this.notifier.hideNewest();
	}

	/**
	 * Hide all notifications at once
	 */
	public hideAllNotifications(): void {
		this.notifier.hideAll();
	}

	public showCustomNotificationTemplate(
		type: string,
		message: string,
		id: string
	): void {
		this.notifier.show({
			id,
			message,
			type,
			template: this.customNotificationTmpl
		});
	}

	/**
	 * Show a specific notification (with a custom notification ID)
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 * @param {string} id      Notification ID
	 */
	public showSpecificNotification(
		type: string,
		message: string,
		id: string
	): void {
		this.notifier.show({
			id,
			message,
			type
		});
	}

	/**
	 * Hide a specific notification (by a given notification ID)
	 *
	 * @param {string} id Notification ID
	 */
	public hideSpecificNotification(id: string): void {
		this.notifier.hide(id);
	}
}
