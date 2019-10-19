import { Component, ViewChild } from '@angular/core';

import { NotifierService } from 'angular-notifier';

/**
 * App component
 */
@Component({
	host: {
		class: 'app'
	},
	selector: 'app',
	templateUrl: './app.component.html'
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
