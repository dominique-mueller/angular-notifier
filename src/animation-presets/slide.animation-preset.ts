import { NotifierAnimationPreset, NotifierAnimationPresetKeyframes } from './../models/notifier-animation.model';
import { NotifierConfig } from './../models/notifier-config.model';
import { NotifierNotification } from './../models/notifier-notification.model';

/**
 * Slide animation preset
 */
export const slide: NotifierAnimationPreset = {
	hide: ( notification: NotifierNotification ): NotifierAnimationPresetKeyframes => {

		// Prepare variables
		const config: NotifierConfig = notification.component.getConfig();
		const shift: number = notification.component.getShift();
		let from: {
			[ animatablePropertyName: string ]: string;
		};
		let to: {
			[ animatablePropertyName: string ]: string;
		};

		// Configure variables, depending on configuration and component
		switch ( config.position.horizontal.position ) {
			case 'left':
				from = {
					transform: `translate3d( 0, ${ shift }px, 0 )`
				};
				to = {
					transform: `translate3d( calc( -100% - ${ config.position.horizontal.distance }px - 10px ), ${ shift }px, 0 )`
				};
				break;
			case 'middle':
				let horizontalPosition: string;
				switch ( config.position.vertical.position ) {
					case 'top':
						horizontalPosition = `calc( -100% - ${ config.position.horizontal.distance }px - 10px )`;
						break;
					case 'bottom':
						horizontalPosition = `calc( 100% + ${ config.position.horizontal.distance }px + 10px )`;
						break;
					default:
						throw new Error( `Notifier Error: "${ config.position.vertical.position }" is not a valid vertical position.` );
				}
				from = {
					transform: `translate3d( -50%, ${ shift }px, 0 )`
				};
				to = {
					transform: `translate3d( -50%, ${ horizontalPosition }, 0 )`
				};
				break;
			case 'right':
				from = {
					transform: `translate3d( 0, ${ shift }px, 0 )`
				};
				to = {
					transform: `translate3d( calc( 100% + ${ config.position.horizontal.distance }px + 10px ), ${ shift }px, 0 )`
				};
				break;
			default:
				throw new Error( `Notifier Error: "${ config.position.horizontal.position }" is not a valid horizontal position.` );
		}

		// Done
		return {
			from,
			to
		};

	},
	show: ( notification: NotifierNotification ): NotifierAnimationPresetKeyframes => {

		// Prepare variables
		const config: NotifierConfig = notification.component.getConfig();
		let from: {
			[ animatablePropertyName: string ]: string;
		};
		let to: {
			[ animatablePropertyName: string ]: string;
		};

		// Configure variables, depending on configuration and component
		switch ( config.position.horizontal.position ) {
			case 'left':
				from = {
					transform: `translate3d( calc( -100% - ${ config.position.horizontal.distance }px - 10px ), 0, 0 )`
				};
				to = {
					transform: 'translate3d( 0, 0, 0 )'
				};
				break;
			case 'middle':
				let horizontalPosition: string;
				switch ( config.position.vertical.position ) {
					case 'top':
						horizontalPosition = `calc( -100% - ${ config.position.horizontal.distance }px - 10px )`;
						break;
					case 'bottom':
						horizontalPosition = `calc( 100% + ${ config.position.horizontal.distance }px + 10px )`;
						break;
					default:
						throw new Error( `Notifier Error: "${ config.position.vertical.position }" is not a valid vertical position.` );
				}
				from = {
					transform: `translate3d( -50%, ${ horizontalPosition }, 0 )`
				};
				to = {
					transform: 'translate3d( -50%, 0, 0 )'
				};
				break;
			case 'right':
				from = {
					transform: `translate3d( calc( 100% + ${ config.position.horizontal.distance }px + 10px ), 0, 0 )`
				};
				to = {
					transform: 'translate3d( 0, 0, 0 )'
				};
				break;
			default:
				throw new Error( `Notifier Error: "${ config.position.horizontal.position }" is not a valid horizontal position.` );
		}

		// Done
		return {
			from,
			to
		};

	}
};
