import { Injectable } from '@angular/core';

/**
 * Notifier global options
 */
export interface NotifierOptionsGlobal {
	animations?: {
		clear?: {
			easing?: string;
			offset?: number | boolean;
			preset?: string;
			speed?: number;
		};
		enabled?: boolean;
		shift?: {
			easing?: string;
			speed?: number;
		};
		show?: {
			easing?: string;
			preset?: string;
			speed?: number;
		};
	};
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
	public animations: {
		clear: {
			easing: string;
			offset: number | boolean;
			preset: string;
			speed: number;
		};
		enabled: boolean;
		shift: {
			easing: string;
			speed: number;
		};
		show: {
			easing: string;
			preset: string;
			speed: number;
		};
	};
	public behaviour: {
		stacking: number | boolean;
	};
	public position: {
		horizontalDistance: number;
		horizontalPosition: 'left' | 'middle' | 'right';
		verticalGap: number;
		verticalDistance: number;
		verticalPosition: 'top' | 'bottom';
	};
	public theme: string;

	/**
	 * Constructor
	 */
	public constructor( customOptions: NotifierOptionsGlobal = {} ) {
		const defaultOptions: any = {
			animations: {
				clear: {
					easing: 'ease',
					offset: 50,
					preset: 'fade',
					speed: 300
				},
				enabled: true,
				shift: {
					easing: 'ease',
					speed: 300
				},
				show: {
					easing: 'ease',
					preset: 'fade',
					speed: 300
				}
			},
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
