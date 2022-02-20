import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { NotifierAction } from '../models/notifier-action.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierNotificationOptions } from '../models/notifier-notification.model';
import { NotifierConfigToken } from '../notifier.tokens';
import { NotifierService } from './notifier.service';
import { NotifierQueueService } from './notifier-queue.service';

/**
 * Notifier Service - Unit Test
 */
const testNotifierConfig: NotifierConfig = new NotifierConfig({
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

describe('Notifier Service', () => {
  let service: NotifierService;
  let queueService: MockNotifierQueueService;

  // Setup test module
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotifierService,
        {
          provide: NotifierQueueService,
          useClass: MockNotifierQueueService,
        },
        {
          provide: NotifierConfigToken,
          useValue: testNotifierConfig,
        },
      ],
    });
  });

  // Inject dependencies
  beforeEach(inject(
    [NotifierService, NotifierQueueService],
    (notifierService: NotifierService, notifierQueueService: MockNotifierQueueService) => {
      service = notifierService;
      queueService = notifierQueueService;
    },
  ));

  it('should instantiate', () => {
    expect(service).toBeDefined();
  });

  it('should show a notification', () => {
    const testNotificationOptions: NotifierNotificationOptions = {
      id: 'ID_FAKE',
      message: 'Lorem ipsum dolor sit amet.',
      type: 'SUCCESS',
    };
    const expectedAction: NotifierAction = {
      payload: testNotificationOptions,
      type: 'SHOW',
    };
    service.show(testNotificationOptions);

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should show a notification, the simply way', () => {
    const testNotificationOptions: NotifierNotificationOptions = {
      message: 'Lorem ipsum dolor sit amet.',
      type: 'SUCCESS',
    };
    const expectedAction: NotifierAction = {
      payload: testNotificationOptions,
      type: 'SHOW',
    };
    service.notify(testNotificationOptions.type, testNotificationOptions.message);

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should show a notification with an explicit ID, the simply way', () => {
    const testNotificationOptions: NotifierNotificationOptions = {
      id: 'ID_FAKE',
      message: 'Lorem ipsum dolor sit amet.',
      type: 'SUCCESS',
    };
    const expectedAction: NotifierAction = {
      payload: testNotificationOptions,
      type: 'SHOW',
    };
    service.notify(testNotificationOptions.type, testNotificationOptions.message, testNotificationOptions.id);

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should hide a specific notification', () => {
    const testNotificationId = 'ID_FAKE';
    const expectedAction: NotifierAction = {
      payload: testNotificationId,
      type: 'HIDE',
    };
    service.hide(testNotificationId);

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should hide the newest notification', () => {
    const expectedAction: NotifierAction = {
      type: 'HIDE_NEWEST',
    };
    service.hideNewest();

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should hide the oldest notification', () => {
    const expectedAction: NotifierAction = {
      type: 'HIDE_OLDEST',
    };
    service.hideOldest();

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should hide all notifications', () => {
    const expectedAction: NotifierAction = {
      type: 'HIDE_ALL',
    };
    service.hideAll();

    expect(queueService.lastAction).toEqual(expectedAction);
  });

  it('should return the configuration', () => {
    expect(service.getConfig()).toEqual(testNotifierConfig);
  });

  it('should return the notification action', () => {
    const testNotificationId = 'ID_FAKE';
    const expectedAction: NotifierAction = {
      payload: testNotificationId,
      type: 'HIDE',
    };
    service.actionStream.subscribe((action) => expect(action).toEqual(expectedAction));
    service.hide(testNotificationId);
  });
});

/**
 * Mock Notifier Queue Service
 */
@Injectable()
class MockNotifierQueueService extends NotifierQueueService {
  /**
   * Last action
   */
  public lastAction: NotifierAction;
  public actionStream = new Subject<NotifierAction>();

  /**
   * Push a new action to the queue
   *
   * @param {NotifierAction} action Action object
   *
   * @override
   */
  public push(action: NotifierAction): void {
    this.lastAction = action;
    this.actionStream.next(action);
  }
}
