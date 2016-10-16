import { Injectable } from '@angular/core';

import { NotifierQueueService } from './notifier-queue.service';
import { NotifierActionType } from './../models/notifier-action.model';

/**
 * Notifier service
 */
@Injectable()
export class NotifierService {

	/**
	 * Notifier queue service
	 */
	private queueService: NotifierQueueService;

	/**
	 * Constructor
	 */
	public constructor( notifierQueueService: NotifierQueueService ) {
		this.queueService = notifierQueueService;
	}

	/**
	 * Notify
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public notify( type: string, message: string ): void {
		this.queueService.push( {
			payload: {
				message: message,
				type: type
			},
			type: NotifierActionType.SHOW
		} );
	}

}
