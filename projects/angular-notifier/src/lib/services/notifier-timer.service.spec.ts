import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { NotifierTimerService } from './notifier-timer.service';

/**
 * Notifier Timer Service - Unit Test
 */
describe('Notifier Timer Service', () => {
  const fullAnimationTime = 5000;
  const longAnimationTime = 4000;
  const shortAnimationTime = 1000;

  let timerService: NotifierTimerService;
  let mockDate: MockDate;

  // Setup test module
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifierTimerService],
    });
  });

  // Inject dependencies
  beforeEach(inject([NotifierTimerService], (notifierTimerService: NotifierTimerService) => {
    timerService = notifierTimerService;
    mockDate = new MockDate();
  }));

  it('should instantiate', () => {
    expect(timerService).toBeDefined();
  });

  it('should start and stop the timer', fakeAsync(() => {
    const timerServiceCallback = jest.fn();
    timerService.start(fullAnimationTime).then(timerServiceCallback);

    tick(longAnimationTime);

    expect(timerServiceCallback).not.toHaveBeenCalled();

    tick(shortAnimationTime);

    expect(timerServiceCallback).toHaveBeenCalled();
  }));

  it('should pause and resume the timer', fakeAsync(() => {
    jest.spyOn(<any>window, 'Date').mockImplementation(() => mockDate);
    const timerServiceCallback = jest.fn();
    timerService.start(fullAnimationTime).then(timerServiceCallback);

    tick(longAnimationTime);
    mockDate.fastForwardTime(longAnimationTime); // Also update the global Date (in addition to the tick)

    timerService.pause();

    tick(shortAnimationTime);
    mockDate.fastForwardTime(shortAnimationTime); // Also update the global Date (in addition to the tick)

    expect(timerServiceCallback).not.toHaveBeenCalled();

    // Resumes the timer, using the same duration as above (a continue doesn't exist yet)
    timerService.continue();
    tick(shortAnimationTime);

    expect(timerServiceCallback).toHaveBeenCalled();
  }));

  it('should stop the timer', fakeAsync(() => {
    const timerServiceCallback = jest.fn();
    timerService.start(fullAnimationTime).then(timerServiceCallback);

    tick(longAnimationTime);
    timerService.stop();
    tick(shortAnimationTime);

    expect(timerServiceCallback).not.toHaveBeenCalled();
  }));
});

/**
 * Mock Date, allows for fast-forwarding the time even in the global Date object
 */
class MockDate extends Date {
  /**
   * Start time (at init)
   */
  private startTime: number;

  /**
   * Elapsed time (since init)
   */
  private elapsedTime: number;

  /**
   * Fast-forward the current time manually
   */
  public fastForwardTime(duration: number): void {
    this.elapsedTime += duration;
  }

  /**
   * Get the current time
   *
   * @override
   */
  public getTime(): number {
    return this.startTime + this.elapsedTime;
  }
}
