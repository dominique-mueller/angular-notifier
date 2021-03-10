import { NotifierAnimationPresetKeyframes } from '../models/notifier-animation.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { slide } from './slide.animation-preset';

/**
 * Slide Animation Preset - Unit Test
 */
describe('Slide Animation Preset', () => {
  describe('(show)', () => {
    it('should return animation keyframes for top-left position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'left',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( calc( -100% - ${testConfig.position.horizontal.distance}px - 10px ), 0, 0 )`,
        },
        to: {
          transform: 'translate3d( 0, 0, 0 )',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.show(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for top-right position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'right',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( calc( 100% + ${testConfig.position.horizontal.distance}px + 10px ), 0, 0 )`,
        },
        to: {
          transform: 'translate3d( 0, 0, 0 )',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.show(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for top-middle position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'middle',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( -50%, calc( -100% - ${testConfig.position.horizontal.distance}px - 10px ), 0 )`,
        },
        to: {
          transform: 'translate3d( -50%, 0, 0 )',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.show(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for bottom-middle position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'middle',
          },
          vertical: {
            distance: 100,
            position: 'bottom',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( -50%, calc( 100% + ${testConfig.position.horizontal.distance}px + 10px ), 0 )`,
        },
        to: {
          transform: 'translate3d( -50%, 0, 0 )',
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.show(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });
  });

  describe('(hide)', () => {
    it('should return animation keyframes for top-left position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'left',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( 0, ${testNotification.component.getShift()}px, 0 )`,
        },
        to: {
          transform: `translate3d( calc( -100% - ${
            testConfig.position.horizontal.distance
          }px - 10px ), ${testNotification.component.getShift()}px, 0 )`,
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.hide(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for top-right position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'right',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( 0, ${testNotification.component.getShift()}px, 0 )`,
        },
        to: {
          transform: `translate3d( calc( 100% + ${
            testConfig.position.horizontal.distance
          }px + 10px ), ${testNotification.component.getShift()}px, 0 )`,
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.hide(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for top-middle position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'middle',
          },
          vertical: {
            distance: 100,
            position: 'top',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( -50%, ${testNotification.component.getShift()}px, 0 )`,
        },
        to: {
          transform: `translate3d( -50%, calc( -100% - ${testConfig.position.horizontal.distance}px - 10px ), 0 )`,
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.hide(<any>testNotification);

      expect(keyframes).toEqual(expectedKeyframes);
    });

    it('should return animation keyframes for bottom-middle position', () => {
      const testConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 50,
            position: 'middle',
          },
          vertical: {
            distance: 100,
            position: 'bottom',
          },
        },
      });
      const testNotification: MockNotification = new MockNotification(testConfig);
      const expectedKeyframes: NotifierAnimationPresetKeyframes = {
        from: {
          transform: `translate3d( -50%, ${testNotification.component.getShift()}px, 0 )`,
        },
        to: {
          transform: `translate3d( -50%, calc( 100% + ${testConfig.position.horizontal.distance}px + 10px ), 0 )`,
        },
      };
      const keyframes: NotifierAnimationPresetKeyframes = slide.hide(<any>testNotification);

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
