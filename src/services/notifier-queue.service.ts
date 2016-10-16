import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NotifierAction } from './../models/notifier-action.model';

/**
 * Notifier queue service
 */
@Injectable()
export class NotifierQueueService {

	/**
	 * Stream of actions, can be subscribed from outside
	 */
	public actionStream: Subject<NotifierAction>;

	/**
	 * Queue of actions
	 */
	private actionQueue: Array<NotifierAction>;

	/**
	 * Flag, true if some action is currently in progress
	 */
	private isActionInProgress: Boolean;

	/**
	 * Constructor
	 */
	public constructor() {
		this.actionStream = new Subject<NotifierAction>();
		this.actionQueue = [];
		this.isActionInProgress = false;
	}

	/**
	 * Push a new action to the queue, and try to run it
	 * @param {NotifierAction} action
	 */
	public push( action: NotifierAction ): void {
		this.actionQueue.push( action );
		this.tryRunningNextAction();
	}

	/**
	 * Continue with the next action (if the current action is finished)
	 */
	public continue(): void {
		this.isActionInProgress = false;
		this.tryRunningNextAction();
	}

	/**
	 * Try to run the next action in the queue
	 * We skip if there is already some action in progress, or if there is no action left
	 */
	private tryRunningNextAction(): void {
		if ( this.isActionInProgress || this.actionQueue.length === 0 ) {
			return; // Skip
		}
		this.isActionInProgress = true;
		this.actionStream.next( this.actionQueue.shift() ); // Push next item to stream
	}

}
