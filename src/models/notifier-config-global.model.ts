import { Injectable } from '@angular/core';

/**
 * Notifier global options
 */
export interface NotifierOptionsGlobal {
	behaviour?: {
		stacking?: number | boolean;
	};
	position?: {
		horizontalDistance?: number;
		horizontalPosition?: 'left' | 'middle' | 'right';
		verticalGap?: number;
		verticalDistance?: number;
		verticalPosition?: 'top' | 'bottom';
	};
	theme?: string;
}

/**
 * Notifier global configuration
 */
@Injectable()
export class NotifierConfigGlobal implements NotifierOptionsGlobal {
	public behaviour: {
		stacking?: number | boolean;
	};
	public position: {
		horizontalDistance?: number;
		horizontalPosition?: 'left' | 'middle' | 'right';
		verticalGap?: number;
		verticalDistance?: number;
		verticalPosition?: 'top' | 'bottom';
	};
	public theme: string;

	/**
	 * Constructor
	 */
	public constructor( customOptions: NotifierOptionsGlobal = {} ) {
		const defaultOptions: any = {
			behaviour: {
				stacking: 4
			},
			position: {
				horizontalDistance: 12,
				horizontalPosition: 'left',
				verticalDistance: 12,
				verticalGap: 10,
				verticalPosition: 'bottom'
			},
			theme: 'material'
		};
		Object.assign( this, defaultOptions, customOptions ); // Merge
	}

}
