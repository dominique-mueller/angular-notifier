import { Injectable } from '@angular/core';

/**
 * Notifier options
 */
export interface NotifierOptions {
	animations?: {
		enabled?: boolean;
		hide?: {
			easing?: string;
			offset?: number | false;
			preset?: string;
			speed?: number;
		};
		overlap?: number | false;
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
		autoHide?: number | false;
		onClick?: 'hide' | false;
		onMouseover?: 'pauseAutoHide' | 'resetAutoHide' | false;
		showDismissButton?: boolean;
		stacking?: number | false;
	};
	position?: {
		horizontal?: {
			distance?: number;
			position?: 'left' | 'middle' | 'right';
		};
		vertical?: {
			distance?: number;
			gap?: number;
			position?: 'top' | 'bottom';
		};
	};
	theme?: string;
}

/**
 * Notifier configuration
 *
 * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
 * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
 * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
 */
@Injectable()
export class NotifierConfig implements NotifierOptions {
	public animations: {
		enabled: boolean;
		hide: {
			easing: string;
			offset: number | false;
			preset: string;
			speed: number;
		};
		overlap: number | false;
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
		autoHide: number | false;
		onClick: 'hide' | false;
		onMouseover: 'pauseAutoHide' | 'resetAutoHide' | false;
		showDismissButton: boolean;
		stacking: number | false;
	};
	public position: {
		horizontal: {
			distance: number;
			position: 'left' | 'middle' | 'right';
		};
		vertical: {
			distance: number;
			gap: number;
			position: 'top' | 'bottom';
		};
	};
	public theme: string;

	/**
	 * Constructor
	 *
	 * @param {NotifierOptions} [customOptions={}] Custom notifier options, optional
	 */
	public constructor( customOptions: NotifierOptions = {} ) {
		const defaultOptions: any = {
			animations: {
				enabled: true,
				hide: {
					easing: 'ease',
					offset: 50,
					preset: 'slide',
					speed: 300
				},
				overlap: 60,
				shift: {
					easing: 'ease',
					speed: 300
				},
				show: {
					easing: 'ease',
					preset: 'slide',
					speed: 300
				}
			},
			behaviour: {
				autoHide: 7000,
				onClick:  false,
				onMouseover: 'pause',
				showDismissButton: true,
				stacking: 4
			},
			position: {
				horizontal: {
					distance: 12,
					position: 'left'
				},
				vertical: {
					distance: 12,
					gap: 10,
					position: 'bottom'
				}
			},
			theme: 'material'
		};
		Object.assign( this, defaultOptions, customOptions ); // Merge all options
	}

}
