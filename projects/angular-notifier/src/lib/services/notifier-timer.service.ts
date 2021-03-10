import { Injectable } from '@angular/core';

/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
@Injectable()
export class NotifierTimerService {
  /**
   * Timestamp (in ms), created in the moment the timer starts
   */
  private now: number;

  /**
   * Remaining time (in ms)
   */
  private remaining: number;

  /**
   * Timeout ID, used for clearing the timeout later on
   */
  private timerId: number;

  /**
   * Promise resolve function, eventually getting called once the timer finishes
   */
  private finishPromiseResolver: () => void;

  /**
   * Constructor
   */
  public constructor() {
    this.now = 0;
    this.remaining = 0;
  }

  /**
   * Start (or resume) the timer
   *
   * @param   duration Timer duration, in ms
   * @returns          Promise, resolved once the timer finishes
   */
  public start(duration: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      // For the first run ...
      this.remaining = duration;

      // Setup, then start the timer
      this.finishPromiseResolver = resolve;
      this.continue();
    });
  }

  /**
   * Pause the timer
   */
  public pause(): void {
    clearTimeout(this.timerId);
    this.remaining -= new Date().getTime() - this.now;
  }

  /**
   * Continue the timer
   */
  public continue(): void {
    this.now = new Date().getTime();
    this.timerId = window.setTimeout(() => {
      this.finish();
    }, this.remaining);
  }

  /**
   * Stop the timer
   */
  public stop(): void {
    clearTimeout(this.timerId);
    this.remaining = 0;
  }

  /**
   * Finish up the timeout by resolving the timer promise
   */
  private finish(): void {
    this.finishPromiseResolver();
  }
}
