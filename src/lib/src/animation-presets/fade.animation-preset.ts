import { NotifierAnimationPreset, NotifierAnimationPresetKeyframes } from './../models/notifier-animation.model';
import { NotifierNotification } from './../models/notifier-notification.model';

/**
 * Fade animation preset
 */
export const fade: NotifierAnimationPreset = {
	hide: ( notification: NotifierNotification ): NotifierAnimationPresetKeyframes => {
		return {
			from: {
				opacity: '1'
			},
			to: {
				opacity: '0'
			}
		};
	},
	show: ( notification: NotifierNotification ): NotifierAnimationPresetKeyframes => {
		return {
			from: {
				opacity: '0'
			},
			to: {
				opacity: '1'
			}
		};
	}
};
