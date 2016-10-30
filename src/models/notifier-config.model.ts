import { Injectable } from '@angular/core';

/**
 * Notifier global options
 */
export interface NotifierOptions {
	animations?: {
		enabled?: boolean;
		hide?: {
			easing?: string;
			offset?: number;
			preset?: string;
			speed?: number;
		};
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
export class NotifierConfig implements NotifierOptions {
	public animations: {
		enabled: boolean;
		hide: {
			easing: string;
			offset: number;
			preset: string;
			speed: number;
		};
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
	public constructor( customOptions: NotifierOptions = {} ) {
		const defaultOptions: any = {
			animations: {
				enabled: true,
				hide: {
					easing: 'ease',
					offset: 200,
					preset: 'fade',
					speed: 300
				},
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
