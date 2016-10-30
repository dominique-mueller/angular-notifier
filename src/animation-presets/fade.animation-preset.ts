import { NotifierNotification } from './../models/notifier-notification.model';
import { NotifierAnimationKeyframes, NotifierAnimationPreset } from './../models/notifier-animation.model';

/**
 * Fade animation preset
 */
export const fade: NotifierAnimationPreset = {
	in: ( notification: NotifierNotification ): NotifierAnimationKeyframes => {
		return {
			from: {
				opacity: 0
			},
			to: {
				opacity: 1
			}
		};
	},
	out: ( notification: NotifierNotification ): NotifierAnimationKeyframes => {
		return {
			from: {
				opacity: 1
			},
			to: {
				opacity: 0
			}
		};
	}
};
