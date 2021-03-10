import { NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { fade } from './fade.animation-preset';

/**
 * Fade animation preset - Unit Test
 */
describe('Fade Animation Preset', () => {
  describe('(show)', () => {
    it('should return animation keyframes', () => {
      const testNotification: MockNotification = new MockNotification(<NotifierConfig>{});
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          opacity: '0',
        },
        to: {
          opacity: '1',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = fade.show(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });
  });

  describe('(hide)', () => {
    it('should return animation keyframes', () => {
      const testNotification: MockNotification = new MockNotification(<NotifierConfig>{});
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          opacity: '1',
        },
        to: {
          opacity: '0',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = fade.hide(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });
  });
});

/**
 * Mock Notification Height
 */
const mockNotificationHeight = 40;

/**
 * Mock Notification Shift
 */
const mockNotificationShift = 80;

/**
 * Mock Notification Width
 */
const mockNotificationWidth = 300;

/**
 * Mock notification, providing static values except the global configuration
 */
class MockNotification {
  /**
   * Configuration
   */
  public config: NotifierConfig;

  /**
   * Notification ID
   */
  public id = 'ID_FAKE';

  /**
   * Notification type
   */
  public type = 'SUCCESS';

  /**
   * Notification message
   */
  public message = 'Lorem ipsum dolor sit amet.';

  /**
   * Notification component
   */
  public component: any = {
    getConfig: () => this.config,
    getHeight: () => mockNotificationHeight,
    getShift: () => mockNotificationShift,
    getWidth: () => mockNotificationWidth,
  };

  /**
   * Constructor
   *
   * @param {NotifierConfig} config Configuration
   */
  public constructor(config: NotifierConfig) {
    this.config = config;
  }
}
