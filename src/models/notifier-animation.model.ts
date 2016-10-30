import { NotifierNotification } from './notifier-notification.model';

/**
 * Notifier animation, similar to the Web Animation API syntax
 */
export interface NoifierAnimationData {

	/**
	 * Animation keyframes, first entry for animate-in, second entry for animate-out
	 */
	keyframes: Array<{
		[ property: string ]: any;
	}>;

	/**
	 * Futher animation options
	 */
	options: {

		/**
		 * Animation delay, in ms
		 */
		delay: number;

		/**
		 * Animation duration, in ms
		 */
		duration: number;

		/**
		 * Animation easing function (cp. CSS easing attributes)
		 */
		easing: string;

		/**
		 * Animation fill mode
		 */
		fill: string;

	};

}

/**
 * Notifier animation keyframes
 */
export interface NotifierAnimationKeyframes {

	/**
	 * CSS attributes before the animation starts
	 */
	from: {
		[ property: string ]: any
	};

	/**
	 * CSS attributes after the animation ends
	 */
	to: {
		[ property: string ]: any
	};

}

/**
 * Notifier animation preset
 */
export interface NotifierAnimationPreset {

	/**
	 * Function generating the keyframes for animating-in
	 */
	in: ( notification: NotifierNotification ) => NotifierAnimationKeyframes;

	/**
	 * Function generating the keyframes for animating-out
	 */
	out: ( notification: NotifierNotification ) => NotifierAnimationKeyframes;

}
