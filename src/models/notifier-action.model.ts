/**
 * Notifier action
 */
export interface NotifierAction extends Object {

	type: NotifierActionType;

	payload?: any;

}

/**
 * Notifier action type
 */
export enum NotifierActionType {
	'SHOW',
	'CLEAR',
	'CLEAR_ALL',
	'CLEAR_NEWEST',
	'CLEAR_OLDEST'
}
