import { Injectable } from '@angular/core';

import { NotifierNotification } from './../models/notifier-notification.model';
import { NoifierAnimationData, NotifierAnimationKeyframes, NotifierAnimationPreset } from './../models/notifier-animation.model';
import { fade } from './../animation-presets/fade.animation-preset';

/**
 * Notifier animation service
 */
@Injectable()
export class NotifierAnimationService {

	/**
	 * List of animation presets
	 */
	private animationPresets: {
		[ animationPreset: string ]: NotifierAnimationPreset
	};

	/**
	 * Constructor
	 */
	public constructor() {
		this.animationPresets = {
			fade: fade
		};
	}

	/**
	 * Get animation data
	 */
	public getAnimationData( direction: string, notification: NotifierNotification ): NoifierAnimationData {

		// Get all necessary animation data
		let keyframes: NotifierAnimationKeyframes;
		let duration: number;
		let easing: string;
		switch ( direction ) { // TODO: Error handling, and maybe return within the switch?
			case 'in':
				keyframes = this.animationPresets[ notification.component.config.animations.show.preset ].in( notification );
				duration = notification.component.config.animations.show.speed;
				easing = notification.component.config.animations.show.easing;
				break;
			case 'out':
				keyframes = this.animationPresets[ notification.component.config.animations.clear.preset ].out( notification );
				duration = notification.component.config.animations.clear.speed;
				easing = notification.component.config.animations.clear.easing;
				break;
		}

		// Build and return animation data
		return {
			keyframes: [
				keyframes.from,
				keyframes.to
			],
			options: {
				delay: 10, // Quick coffee break for the browser - TODO: Still necessary?
				duration: duration,
				easing: easing,
				fill: 'forwards' // Keep the new paint state after the animation is finished
			}
		};

	}

}
