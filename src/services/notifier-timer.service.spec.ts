import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { NotifierTimerService } from './notifier-timer.service';

/**
 * Notifier Timer Service - Unit Test
 */
export function main(): void {

	describe( 'Notifier Timer Service', () => {

		let timerService: NotifierTimerService;
		let mockDate: MockDate = new MockDate();

		// Setup test module
		beforeEach( () => {
			TestBed.configureTestingModule( {
				providers: [
					NotifierTimerService
				]
			} );
		} );

		// Inject dependencies
		beforeEach( inject( [ NotifierTimerService ], ( notifierTimerService: NotifierTimerService ) => {
			timerService = notifierTimerService;
			mockDate.reset(); // Reset global date
		} ) );

		it( 'should instantiate', () => {

			expect( timerService ).toBeDefined();

		} );

		it( 'should start and stop the timer', fakeAsync( () => {

			const timerServiceCallback: () => {} = jasmine.createSpy( 'timerServiceCallback' );
			timerService.start( 5000 ).then( timerServiceCallback );

			tick( 4000 );

			expect( timerServiceCallback ).not.toHaveBeenCalled();

			tick( 1000 );

			expect( timerServiceCallback ).toHaveBeenCalled();

		} ) );

		it( 'should pause and resume the timer', fakeAsync( () => {

			spyOn( window, 'Date' ).and.callFake( () => mockDate );
			const timerServiceCallback: () => {} = jasmine.createSpy( 'timerServiceCallback' );
			timerService.start( 5000 ).then( timerServiceCallback );

			tick( 4000 );
			mockDate.fastForwardTime( 4000 ); // Also update the global Date (in addition to the tick)

			timerService.pause();

			tick( 1000 );
			mockDate.fastForwardTime( 1000 ); // Also update the global Date (in addition to the tick)

			expect( timerServiceCallback ).not.toHaveBeenCalled();

			// Resumes the timer, using the same duration as above (a continue doesn't exist yet)
			timerService.continue();
			tick( 1000 );

			expect( timerServiceCallback ).toHaveBeenCalled();

		} ) );

		it( 'should stop the timer', fakeAsync( () => {

			const timerServiceCallback: () => {} = jasmine.createSpy( 'timerServiceCallback' );
			timerService.start( 5000 ).then( timerServiceCallback );

			tick( 4000 );
			timerService.stop();
			tick( 1000 );

			expect( timerServiceCallback ).not.toHaveBeenCalled();

		} ) );

	} );

}

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
	 * Reset the date to the default values (thus, the current time as well)
	 */
	public reset(): void {
		this.startTime = new Date().getTime();
		this.elapsedTime = 0;
	}

	/**
	 * Fast-forward the current time manually
	 */
	public fastForwardTime( duration: number ): void {
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
