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
	'HIDE',
	'HIDE_ALL',
	'HIDE_NEWEST',
	'HIDE_OLDEST'
}
