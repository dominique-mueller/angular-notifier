import { NotifierAnimationPreset, NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';

/**
 * Fade animation preset
 */
export const fade: NotifierAnimationPreset = {
	hide: (): NotifierAnimationPresetKeyframes => {
		return {
			from: {
				opacity: '1'
			},
			to: {
				opacity: '0'
			}
		};
	},
	show: (): NotifierAnimationPresetKeyframes => {
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
