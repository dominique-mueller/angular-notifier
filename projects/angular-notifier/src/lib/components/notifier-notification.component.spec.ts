import { Component, DebugElement, Injectable, NO_ERRORS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NotifierAnimationData } from '../models/notifier-animation.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierConfigToken } from '../notifier.tokens';
import { NotifierService } from '../services/notifier.service';
import { NotifierAnimationService } from '../services/notifier-animation.service';
import { NotifierTimerService } from '../services/notifier-timer.service';
import { NotifierNotificationComponent } from './notifier-notification.component';

/**
 * Notifier Notification Component - Unit Test
 */
describe('Notifier Notification Component', () => {
  const fakeAnimation: any = {
    onfinish: () => null, // We only need this property to be actually mocked away
  };

  const testNotification: NotifierNotification = new NotifierNotification({
    id: 'ID_FAKE',
    message: 'Lorem ipsum dolor sit amet.',
    type: 'SUCCESS',
  });

  let componentFixture: ComponentFixture<NotifierNotificationComponent>;
  let componentInstance: NotifierNotificationComponent;

  let timerService: MockNotifierTimerService;

  it('should instantiate', () => {
    // Setup test module
    beforeEachWithConfig(new NotifierConfig());

    expect(componentInstance).toBeDefined();
  });

  describe('(render)', () => {
    it('should render', () => {
      // Setup test module
      beforeEachWithConfig(new NotifierConfig());

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check the calculated values
      expect(componentInstance.getConfig()).toEqual(new NotifierConfig());
      expect(componentInstance.getHeight()).toBe(componentFixture.nativeElement.offsetHeight);
      expect(componentInstance.getWidth()).toBe(componentFixture.nativeElement.offsetWidth);
      expect(componentInstance.getShift()).toBe(0);

      // Check the template
      const messageElement: DebugElement = componentFixture.debugElement.query(By.css('.notifier__notification-message'));
      expect(messageElement.nativeElement.textContent).toContain(componentInstance.notification.message);
      const dismissButtonElement: DebugElement = componentFixture.debugElement.query(By.css('.notifier__notification-button'));
      expect(dismissButtonElement).not.toBeNull();

      // Check the class names
      const classNameType = `notifier__notification--${componentInstance.notification.type}`;
      expect(componentFixture.nativeElement.classList.contains(classNameType)).toBeTruthy();
      const classNameTheme = `notifier__notification--${componentInstance.getConfig().theme}`;
      expect(componentFixture.nativeElement.classList.contains(classNameTheme)).toBeTruthy();
    });

    it('should render the custom template if provided by the user', async(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'left',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig, false);

      const template = `<ng-template #tpl let-notificationData="notification"><div class="custom-notification-body">{{notificationData.message}}</div></ng-template>`;

      const testcmp = createTestComponent(template);

      // associate the templateref
      const myTestNotification = {
        ...testNotification,
        template: testcmp.componentInstance.currentTplRef,
      };
      expect(testcmp.componentInstance.currentTplRef).toBeDefined();

      componentFixture = TestBed.createComponent(NotifierNotificationComponent);
      componentInstance = componentFixture.componentInstance;

      componentInstance.notification = myTestNotification;
      componentFixture.detectChanges();

      // // assert
      expect(componentFixture.debugElement.query(By.css('div.custom-notification-body'))).not.toBeNull();
      expect(componentFixture.debugElement.query(By.css('div.custom-notification-body')).nativeElement.innerHTML).toBe(
        myTestNotification.message,
      );
    }));

    it('should render on the left', () => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'left',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check position
      expect(componentFixture.debugElement.styles['left']).toBe(`${testNotifierConfig.position.horizontal.distance}px`);
    });

    it('should render on the right', () => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'right',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check position
      expect(componentFixture.debugElement.styles['right']).toBe(`${testNotifierConfig.position.horizontal.distance}px`);
    });

    it('should render in the middle', () => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'middle',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check position
      expect(componentFixture.debugElement.styles['left']).toBe('50%');
      expect(componentFixture.debugElement.styles['transform']).toBe('translate3d( -50%, 0, 0 )');
    });

    it('should render on the top', () => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'left',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check position
      expect(componentFixture.debugElement.styles['top']).toBe(`${testNotifierConfig.position.vertical.distance}px`);
    });

    it('should render on the bottom', () => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        position: {
          horizontal: {
            distance: 10,
            position: 'left',
          },
          vertical: {
            distance: 10,
            gap: 4,
            position: 'bottom',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Check position
      expect(componentFixture.debugElement.styles['bottom']).toBe(`${testNotifierConfig.position.vertical.distance}px`);
    });
  });

  describe('(show)', () => {
    it('should show', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: false,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const showCallback = jest.fn();
      componentInstance.show().then(showCallback);
      tick();

      expect(componentFixture.debugElement.styles['visibility']).toBe('visible');
      expect(showCallback).toHaveBeenCalled();
    }));

    it('should show (with animations)', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          behaviour: {
            autoHide: false,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['opacity'] = '1'; // Fake animation result
        return fakeAnimation;
      });

      const showCallback = jest.fn();
      componentInstance.show().then(showCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['visibility']).toBe('visible');
      expect(componentFixture.debugElement.styles['opacity']).toBe('1');
      expect(showCallback).toHaveBeenCalled();
    }));
  });

  describe('(hide)', () => {
    it('should hide', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: false,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const hideCallback = jest.fn();
      componentInstance.hide().then(hideCallback);
      tick();

      expect(hideCallback).toHaveBeenCalled();
    }));

    it('should hide (with animations)', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          behaviour: {
            autoHide: false,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['opacity'] = '0'; // Fake animation result
        return fakeAnimation;
      });

      const hideCallback = jest.fn();
      componentInstance.hide().then(hideCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['opacity']).toBe('0');
      expect(hideCallback).toHaveBeenCalled();
    }));
  });

  describe('(shift)', () => {
    it('should shift to make place on top', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'left',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftCallback = jest.fn();
      const shiftDistance = 100;
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to make place on top (with animations)', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'left',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftDistance = 100;

      // Mock away the Web Animations API
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['transform'] = `translate3d( 0, ${
          shiftDistance + testNotifierConfig.position.vertical.gap
        }px, 0 )`; // Fake animation result
        return fakeAnimation;
      });

      const shiftCallback = jest.fn();
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to make place on bottom', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
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
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftCallback = jest.fn();
      const shiftDistance = 100;
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${-shiftDistance - testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to make place on bottom (with animations)', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        behaviour: {
          autoHide: false,
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
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      const shiftDistance = 100;
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['transform'] = `translate3d( 0, ${
          -shiftDistance - testNotifierConfig.position.vertical.gap
        }px, 0 )`; // Fake animation result
        return fakeAnimation;
      });

      const shiftCallback = jest.fn();
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${-shiftDistance - testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to fill place on top', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'left',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftCallback = jest.fn();
      const shiftDistance = 100;
      componentInstance.shift(shiftDistance, false).then(shiftCallback);
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${-shiftDistance - testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to fill place on top (with animations)', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'left',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      const shiftDistance = 100;
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['transform'] = `translate3d( 0, ${
          -shiftDistance - testNotifierConfig.position.vertical.gap
        }px, 0 )`; // Fake animation result
        return fakeAnimation;
      });

      const shiftCallback = jest.fn();
      componentInstance.shift(shiftDistance, false).then(shiftCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${0 - shiftDistance - testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to fill place on bottom', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
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
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftCallback = jest.fn();
      const shiftDistance = 100;
      componentInstance.shift(shiftDistance, false).then(shiftCallback);
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to fill place on bottom (with animations)', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        behaviour: {
          autoHide: false,
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
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      const shiftDistance = 100;
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['transform'] = `translate3d( 0, ${
          shiftDistance + testNotifierConfig.position.vertical.gap
        }px, 0 )`; // Fake animation result
        return fakeAnimation;
      });

      const shiftCallback = jest.fn();
      componentInstance.shift(shiftDistance, false).then(shiftCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( 0, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to make place in the middle', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'middle',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      const shiftCallback = jest.fn();
      const shiftDistance = 100;
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( -50%, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));

    it('should shift to make place in the middle (with animations)', fakeAsync(() => {
      // Setup test module
      const testNotifierConfig: NotifierConfig = new NotifierConfig({
        animations: {
          enabled: false,
        },
        behaviour: {
          autoHide: false,
        },
        position: {
          horizontal: {
            distance: 12,
            position: 'middle',
          },
          vertical: {
            distance: 12,
            gap: 10,
            position: 'top',
          },
        },
      });
      beforeEachWithConfig(testNotifierConfig);

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      // Mock away the Web Animations API
      const shiftDistance = 100;
      jest.spyOn(componentFixture.nativeElement, 'animate').mockImplementation(() => {
        componentFixture.debugElement.styles['transform'] = `translate3d( -50%, ${
          shiftDistance + testNotifierConfig.position.vertical.gap
        }px, 0 )`; // Fake animation result
        return fakeAnimation;
      });

      const shiftCallback = jest.fn();
      componentInstance.shift(shiftDistance, true).then(shiftCallback);
      fakeAnimation.onfinish();
      tick();

      expect(componentFixture.debugElement.styles['transform']).toBe(
        `translate3d( -50%, ${shiftDistance + testNotifierConfig.position.vertical.gap}px, 0 )`,
      );
      expect(shiftCallback).toHaveBeenCalled();
    }));
  });

  describe('(behaviour)', () => {
    it('should hide automatically after timeout', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: 5000,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');
      tick();

      timerService.finishManually();
      tick();

      expect(componentInstance.onClickDismiss).toHaveBeenCalled();
    }));

    it('should hide after clicking the dismiss button', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: false,
            showDismissButton: true,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');

      const dismissButtonElement: DebugElement = componentFixture.debugElement.query(By.css('.notifier__notification-button'));
      dismissButtonElement.nativeElement.click(); // Emulate click event
      componentFixture.detectChanges();

      expect(componentInstance.onClickDismiss).toHaveBeenCalled();
    }));

    it('should hide after clicking on the notification', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: false,
            onClick: 'hide',
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');

      componentFixture.nativeElement.click(); // Emulate click event
      componentFixture.detectChanges();

      expect(componentInstance.onClickDismiss).toHaveBeenCalled();
    }));

    it('should not hide after clicking on the notification', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: false,
            onClick: false,
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');

      componentFixture.nativeElement.click(); // Emulate click event
      componentFixture.detectChanges();

      expect(componentInstance.onClickDismiss).not.toHaveBeenCalled();
    }));

    it('should pause the autoHide timer on mouseover, and resume again on mouseout', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: 5000,
            onMouseover: 'pauseAutoHide',
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');
      jest.spyOn(timerService, 'pause');
      jest.spyOn(timerService, 'continue');

      componentInstance.onNotificationMouseover();

      expect(timerService.pause).toHaveBeenCalled();

      componentInstance.onNotificationMouseout();

      expect(timerService.continue).toHaveBeenCalled();

      timerService.finishManually();
      tick();

      expect(componentInstance.onClickDismiss).toHaveBeenCalled();
    }));

    it('should restart the autoHide timer on mouseover', fakeAsync(() => {
      // Setup test module
      beforeEachWithConfig(
        new NotifierConfig({
          animations: {
            enabled: false,
          },
          behaviour: {
            autoHide: 5000,
            onMouseover: 'resetAutoHide',
          },
        }),
      );

      componentInstance.notification = testNotification;
      componentFixture.detectChanges();

      componentInstance.show();
      jest.spyOn(componentInstance, 'onClickDismiss');
      jest.spyOn(timerService, 'stop');
      jest.spyOn(timerService, 'start');

      componentInstance.onNotificationMouseover();

      expect(timerService.stop).toHaveBeenCalled();

      componentInstance.onNotificationMouseout();

      expect(timerService.start).toHaveBeenCalled();

      timerService.finishManually();
      tick();

      expect(componentInstance.onClickDismiss).toHaveBeenCalled();
    }));
  });

  /**
   * Helper for upfront configuration
   */
  function beforeEachWithConfig(testNotifierConfig: NotifierConfig, extractServices = true): void {
    TestBed.configureTestingModule({
      declarations: [NotifierNotificationComponent, TestComponent],
      providers: [
        {
          provide: NotifierService,
          useValue: {
            getConfig: () => testNotifierConfig,
          },
        },
        {
          // No idea why this is *actually* necessary -- it shouldn't be ...
          provide: NotifierConfigToken,
          useValue: {},
        },
        {
          provide: NotifierAnimationService,
          useClass: MockNotifierAnimationService,
        },
      ],
    }).overrideComponent(NotifierNotificationComponent, {
      set: {
        providers: [
          // Override component-specific providers
          {
            provide: NotifierTimerService,
            useClass: MockNotifierTimerService,
          },
        ],
      },
    });

    if (extractServices) {
      componentFixture = TestBed.createComponent(NotifierNotificationComponent);
      componentInstance = componentFixture.componentInstance;

      // Get the service from the component's local injector
      timerService = <MockNotifierTimerService>componentFixture.debugElement.injector.get(NotifierTimerService);
    }
  }
});

/**
 * Mock notifier animation service, always returning the animation
 */
@Injectable()
class MockNotifierAnimationService extends NotifierAnimationService {
  /**
   * Get animation data
   *
   * @param   {'show' | 'hide'}       direction    Animation direction, either in or out
   * @returns {NotifierAnimationData}              Animation information
   *
   * @override
   */
  public getAnimationData(direction: 'show' | 'hide'): NotifierAnimationData {
    if (direction === 'show') {
      return {
        keyframes: [
          {
            opacity: '0',
          },
          {
            opacity: '1',
          },
        ],
        options: {
          duration: 300,
          easing: 'ease',
          fill: 'forwards',
        },
      };
    } else {
      return {
        keyframes: [
          {
            opacity: '1',
          },
          {
            opacity: '0',
          },
        ],
        options: {
          duration: 300,
          easing: 'ease',
          fill: 'forwards',
        },
      };
    }
  }
}

/**
 * Mock Notifier Timer Service
 */
@Injectable()
class MockNotifierTimerService extends NotifierTimerService {
  /**
   * Temp resolve function
   *
   * @override
   */
  private resolveFunction: () => void;

  /**
   * Start (or resume) the timer - doing nothing here
   *
   * @param   {number}             duration Timer duration, in ms
   * @returns {Promise<undefined>}          Promise, resolved once the timer finishes
   *
   * @override
   */
  public start(): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      this.resolveFunction = resolve;
    });
  }

  /**
   * Pause the timer - doing nothing here
   */
  public pause(): void {
    // Do nothing
  }

  /**
   * Continue the timer - doing nothing here
   */
  public continue(): void {
    // Do nothing
  }

  /**
   * Stop the timer - doing nothing here
   */
  public stop(): void {
    // Do nothing
  }

  /**
   * Finish the timer manually, from outside
   */
  public finishManually(): void {
    this.resolveFunction();
  }
}

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  @ViewChild('tpl', { static: true })
  currentTplRef: TemplateRef<any>;
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, { set: { template: template } })
    .configureTestingModule({ schemas: [NO_ERRORS_SCHEMA] })
    .createComponent(TestComponent);
}
