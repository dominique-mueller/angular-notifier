import { Inject, Injectable, forwardRef } from '@angular/core';

import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierNotificationOptions } from '../models/notifier-notification.model';
import { NotifierQueueService } from './notifier-queue.service';
import { NotifierConfigToken } from '../notifier.tokens';

/**
 * Notifier service
 *
 * This service provides access to the public notifier API. Once injected into a component, directive, pipe, service, or any other building
 * block of an applications, it can be used to show new notifications, and hide existing ones. Internally, it transforms API calls into
 * actions, which then get thrown into the action queue - eventually being processed at the right moment.
 */
@Injectable()
export class NotifierService {

	/**
	 * Notifier queue service
	 */
	private readonly queueService: NotifierQueueService;

	/**
	 * Notifier configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * Constructor
	 *
	 * @param notifierQueueService Notifier queue service
	 * @param config               Notifier configuration, optionally injected as a dependency
	 */
	public constructor(
		notifierQueueService: NotifierQueueService,
		@Inject(NotifierConfigToken) config: NotifierConfig
	) {
		this.queueService = notifierQueueService;
		this.config = config;
	}

	/**
	 * Get the notifier configuration
	 *
	 * @returns Notifier configuration
	 */
	public getConfig(): NotifierConfig {
		return this.config;
	}

	/**
	 * API: Show a new notification
	 *
	 * @param notificationOptions Notification options
	 */
	public show( notificationOptions: NotifierNotificationOptions ): void {
		this.queueService.push( {
			payload: notificationOptions,
			type: 'SHOW'
		} );
	}

	/**
	 * API: Hide a specific notification, given its ID
	 *
	 * @param notificationId ID of the notification to hide
	 */
	public hide( notificationId: string ): void {
		this.queueService.push( {
			payload: notificationId,
			type: 'HIDE'
		} );
	}

	/**
	 * API: Hide the newest notification
	 */
	public hideNewest(): void {
		this.queueService.push( {
			type: 'HIDE_NEWEST'
		} );
	}

	/**
	 * API: Hide the oldest notification
	 */
	public hideOldest(): void {
		this.queueService.push( {
			type: 'HIDE_OLDEST'
		} );
	}

	/**
	 * API: Hide all notifications at once
	 */
	public hideAll(): void {
		this.queueService.push( {
			type: 'HIDE_ALL'
		} );
	}

	/**
	 * API: Shortcut for showing a new notification
	 *
	 * @param type             Type of the notification
	 * @param message          Message of the notification
	 * @param [notificationId] Unique ID for the notification (optional)
	 * @param hideOnlyOnAction To Stop Notification Hide Timer (optional)
	 */
	public notify( type: string, message: string, notificationId?: string, hideOnlyOnAction?: boolean ): void {
		let notificationOptions: NotifierNotificationOptions = {
			message,
			type
		};
		if ( notificationId !== undefined ) {
			notificationOptions.id = notificationId;
		}

		if( hideOnlyOnAction !== undefined) {
			notificationOptions.hideOnlyOnAction = hideOnlyOnAction;
		}

		this.show( notificationOptions );
	}

}
