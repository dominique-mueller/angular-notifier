import { TestBed } from '@angular/core/testing';

import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';
import { NotifierModule } from './notifier.module';
import { NotifierService } from './services/notifier.service';

/**
 * Notifier Module - Unit Test
 */
describe('Notifier Module', () => {
  it('should instantiate', () => {
    TestBed.configureTestingModule({
      imports: [NotifierModule],
    });
    const service: NotifierService = TestBed.inject(NotifierService);

    expect(service).toBeDefined();
  });

  it('should instantiate with default options', () => {
    TestBed.configureTestingModule({
      imports: [NotifierModule],
    });
    const service: NotifierService = TestBed.inject(NotifierService);

    expect(service.getConfig()).toEqual(new NotifierConfig());
  });

  it('should instantiate with custom options', () => {
    const testNotifierOptions: NotifierOptions = {
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
    };
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

    TestBed.configureTestingModule({
      imports: [NotifierModule.withConfig(testNotifierOptions)],
    });
    const service: NotifierService = TestBed.inject(NotifierService);

    expect(service.getConfig()).toEqual(expectedNotifierConfig);
  });
});
