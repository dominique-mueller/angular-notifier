import { Injectable, Optional } from '@angular/core';

import { NotifierNotificationOptions } from './../models/notifier-notification.model';
import { NotifierActionType } from './../models/notifier-action.model';
import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierQueueService } from './notifier-queue.service';

/**
 * Notifier service
 */
@Injectable()
export class NotifierService {

	/**
	 * Notifier queue service
	 */
	private readonly queueService: NotifierQueueService;

	/**
	 * Notifier global configuration
	 */
	private readonly config: NotifierConfig;

	/**
	 * Constructor
	 */
	public constructor( notifierQueueService: NotifierQueueService, @Optional() config: NotifierConfig ) {
		this.queueService = notifierQueueService;
		this.config = config === null ? new NotifierConfig() : config; // Use custom config, if defined
	}

	/**
	 * Get the notifier configuration
	 */
	public getConfig(): NotifierConfig {
		return this.config;
	}

	/**
	 * API: Show a new notification
	 */
	public show( notificationOptions: NotifierNotificationOptions ): void {
		this.queueService.push( {
			payload: notificationOptions,
			type: NotifierActionType.SHOW
		} );
	}

	/**
	 * API: Hide a specific notification
	 */
	public hide( notificationId: string ): void {
		this.queueService.push( {
			payload: notificationId,
			type: NotifierActionType.HIDE
		} );
	}

	/**
	 * API: Hide newest notification
	 */
	public hideNewest(): void {
		this.queueService.push( {
			type: NotifierActionType.HIDE_NEWEST
		} );
	}

	/**
	 * API: Hide oldest notification
	 */
	public hideOldest(): void {
		this.queueService.push( {
			type: NotifierActionType.HIDE_OLDEST
		} );
	}

	/**
	 * API: Hide all notifications
	 */
	public hideAll(): void {
		this.queueService.push( {
			type: NotifierActionType.HIDE_ALL
		} );
	}

	/**
	 * API: Shortcut for showing a new notification
	 */
	public notify( type: string, message: string ): void {
		this.show( {
			message,
			type
		} );
	}

}
