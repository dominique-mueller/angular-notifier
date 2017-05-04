/**
 * This file contains custom typings for this library.
 *
 * Sadly, while TypeScript comes with a very rich set of  typings for JavaScript and the DOM, some things are missing, including offset
 * width & height values on the HTMLElement, the animate() method on the Element plus various Web Animations API related interfaces. To
 * reduce the amount of 'any' usage in those cases, the following typings are defined to (hopefully only temporarily) help us out.
 *
 * Typings related to the Web Animations API are guessed based on the official MDN documentation. They should be complete on the first
 * level, deeper levels -- and thus functionality not used by this library -- is not typed in further details, but declared as type 'any'.
 * For details, see <https://developer.mozilla.org/en-US/docs/Web/API/Element/animate>.
 */

/**
 * Extended HTMLElement
 *
 * We can simply extend the default TypeScript definitions as TypeScript interfaces are *open ended*.
 * See <https://github.com/basarat/typescript-book/blob/master/docs/types/interfaces.md>.
 */
interface HTMLElement {
	// offsetHeight: number;
	// offsetWidth: number;
	animate: ( keyframes: AnimationKeyframes, options?: AnimationOptions | number ) => Animation;
}

/**
 * Animation keyframe
 */
type AnimationKeyframe = { [ animatablePropertyName: string ]: string };

/**
 * Animation Keyframes
 */
type AnimationKeyframes = Array<AnimationKeyframe>;

/**
 * Animation options
 */
interface AnimationOptions {
	id?: string;
	delay?: number;
	direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
	duration?: number;
	easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
	endDelay?: number;
	fill?: 'none' | 'forwards' | 'backwards';
	iterationStart?: number;
	iterations?: number;
}

/**
 * Animation object, returned by element.animate()
 */
interface Animation {
	currentTime: number | null;
	// tslint:disable no-any
	effect: any | null; // No deeper type details needed
	// tslint:enable no-any
	readonly finished: Promise<undefined>;
	id: string | null;
	readonly playState: 'idle' | 'pending' | 'running' | 'paused' | 'finished';
	playbackRate: number;
	readonly ready: Promise<undefined>;
	startTime: number | null;
	// tslint:disable no-any
	timeline: any | null; // No deeper type details needed
	// tslint:enable no-any

	oncancel: () => void | null;
	onfinish: () => void | null;

	cancel: () => void;
	finish: () => void;
	pause: () => void;
	play: () => void;
	reverse: () => void;
}
