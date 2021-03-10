import { Injectable } from '@angular/core';

import { fade } from '../animation-presets/fade.animation-preset';
import { slide } from '../animation-presets/slide.animation-preset';
import { NotifierAnimationData, NotifierAnimationPreset, NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { NotifierNotification } from '../models/notifier-notification.model';

/**
 * Notifier animation service
 */
@Injectable()
export class NotifierAnimationService {
  /**
   * List of animation presets (currently static)
   */
  private readonly animationPresets: {
    [animationPresetName: string]: NotifierAnimationPreset;
  };

  /**
   * Constructor
   */
  public constructor() {
    this.animationPresets = {
      fade,
      slide,
    };
  }

  /**
   * Get animation data
   *
   * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
   * direction (either in or out) as well as the notifications (and its attributes) itself.
   *
   * @param   direction    Animation direction, either in or out
   * @param   notification Notification the animation data should be generated for
   * @returns Animation information
   */
  public getAnimationData(direction: 'show' | 'hide', notification: NotifierNotification): NotifierAnimationData {
    // Get all necessary animation data
    let keyframes: NotifierAnimationPresetKeyframes;
    let duration: number;
    let easing: string;
    if (direction === 'show') {
      keyframes = this.animationPresets[notification.component.getConfig().animations.show.preset].show(notification);
      duration = notification.component.getConfig().animations.show.speed;
      easing = notification.component.getConfig().animations.show.easing;
    } else {
      keyframes = this.animationPresets[notification.component.getConfig().animations.hide.preset].hide(notification);
      duration = notification.component.getConfig().animations.hide.speed;
      easing = notification.component.getConfig().animations.hide.easing;
    }

    // Build and return animation data
    return {
      keyframes: [keyframes.from, keyframes.to],
      options: {
        duration,
        easing,
        fill: 'forwards', // Keep the newly painted state after the animation finished
      },
    };
  }
}
