import { forwardRef, Inject, Injectable, Optional } from '@angular/core';

import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierNotificationOptions } from './../models/notifier-notification.model';
import { NotifierQueueService } from './notifier-queue.service';
import { NotifierConfigToken } from './../notifier.module';

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
	 * @param {NotifierQueueService} notifierQueueService Notifier queue service
	 * @param {NotifierConfig}       config               Notifier configuration, optionally injected as a dependency
	 */
	public constructor(
		notifierQueueService: NotifierQueueService,
		@Inject( forwardRef( () => NotifierConfigToken ) ) config: NotifierConfig // The forwardRef is (sadly) required here
	) {
		this.queueService = notifierQueueService;
		this.config = config;
	}

	/**
	 * Get the notifier configuration
	 *
	 * @returns {NotifierConfig} Notifier configuration
	 */
	public getConfig(): NotifierConfig {
		return this.config;
	}

	/**
	 * API: Show a new notification
	 *
	 * @param {NotifierNotificationOptions} notificationOptions Notification options
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
	 * @param {string} notificationId ID of the notification to hide
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
	 * @param {string} type             Type of the notification
	 * @param {string} message          Message of the notification
	 * @param {string} [notificationId] Unique ID for the notification (optional)
	 */
	public notify( type: string, message: string, notificationId?: string ): void {
		let notificationOptions: NotifierNotificationOptions = {
			message,
			type
		};
		if ( notificationId !== undefined ) {
			notificationOptions.id = notificationId;
		}
		this.show( notificationOptions );
	}

}
