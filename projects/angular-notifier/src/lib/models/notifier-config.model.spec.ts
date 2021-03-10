import { NotifierConfig } from './notifier-config.model';

/**
 * Notifier Configuration - Unit Test
 */
describe('Notifier Configuration', () => {
  it('should initialize with the default configuration', () => {
    const testNotifierConfig: NotifierConfig = new NotifierConfig();
    const expectedNotifierConfig: NotifierConfig = new NotifierConfig({
      animations: {
        enabled: true,
        hide: {
          easing: 'ease',
          offset: 50,
          preset: 'fade',
          speed: 300,
        },
        overlap: 150,
        shift: {
          easing: 'ease',
          speed: 300,
        },
        show: {
          easing: 'ease',
          preset: 'slide',
          speed: 300,
        },
      },
      behaviour: {
        autoHide: 7000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      position: {
        horizontal: {
          distance: 12,
          position: 'left',
        },
        vertical: {
          distance: 12,
          gap: 10,
          position: 'bottom',
        },
      },
      theme: 'material',
    });

    expect(testNotifierConfig).toEqual(expectedNotifierConfig);
  });

  it('should override custom bits of the configuration', () => {
    const testNotifierConfig: NotifierConfig = new NotifierConfig({
      animations: {
        hide: {
          easing: 'ease-in-out',
        },
        overlap: 100,
        shift: {
          speed: 200,
        },
      },
      behaviour: {
        autoHide: 5000,
        stacking: 7,
      },
      position: {
        horizontal: {
          distance: 20,
        },
      },
      theme: 'my-custom-theme',
    });
    const expectedNotifierConfig: NotifierConfig = new NotifierConfig({
      animations: {
        enabled: true,
        hide: {
          easing: 'ease-in-out',
          offset: 50,
          preset: 'fade',
          speed: 300,
        },
        overlap: 100,
        shift: {
          easing: 'ease',
          speed: 200,
        },
        show: {
          easing: 'ease',
          preset: 'slide',
          speed: 300,
        },
      },
      behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 7,
      },
      position: {
        horizontal: {
          distance: 20,
          position: 'left',
        },
        vertical: {
          distance: 12,
          gap: 10,
          position: 'bottom',
        },
      },
      theme: 'my-custom-theme',
    });

    expect(testNotifierConfig).toEqual(expectedNotifierConfig);
  });
});
