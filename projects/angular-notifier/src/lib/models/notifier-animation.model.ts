import { NotifierNotification } from './notifier-notification.model';

/**
 * Notifier animation data
 *
 * This interface describes an object containing all information necessary to run an animation, in particular to run an animation with the
 * all new (shiny) Web Animations API. When other components or services request data for an animation they have to run, this is the object
 * they get back from the animation service.
 *
 * Technical sidenote:
 * Nope, it's not a coincidence - the structure looks similar to the Web Animation API syntax.
 */
export interface NotifierAnimationData {
  /**
   * Animation keyframes; the first index ctonaining changes for animate-in, the second index those for animate-out
   */
  keyframes: Array<{
    [animatablePropertyName: string]: string;
  }>;

  /**
   * Futher animation options
   */
  options: {
    /**
     * Animation duration, in ms
     */
    duration: number;

    /**
     * Animation easing function (comp. CSS easing functions)
     */
    easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;

    /**
     * Animation fill mode
     */
    fill: 'none' | 'forwards' | 'backwards';
  };
}

/**
 * Notifier animation preset
 *
 * This interface describes the structure of an animation preset, defining the keyframes for both animating-in and animating-out. Animation
 * presets are always defined outside the animation service, and therefore one day may become part of some new API.
 */
export interface NotifierAnimationPreset {
  /**
   * Function generating the keyframes for animating-out
   */
  hide: (notification: NotifierNotification) => NotifierAnimationPresetKeyframes;

  /**
   * Function generating the keyframes for animating-in
   */
  show: (notification: NotifierNotification) => NotifierAnimationPresetKeyframes;
}

/**
 * Notifier animation keyframes
 *
 * This interface describes the data, in particular all the keyframes animation presets return.
 */
export interface NotifierAnimationPresetKeyframes {
  /**
   * CSS attributes before the animation starts
   */
  from: {
    [animatablePropertyName: string]: string;
  };

  /**
   * CSS attributes after the animation ends
   */
  to: {
    [animatablePropertyName: string]: string;
  };
}
