import { NotifierNotification } from './notifier-notification.model';

/**
 * Notifier Notification Model - Unit Test
 */
describe( 'Notifier Notification Model', () => {

	const testNotificationType: string = 'SUCCESS';
	const testNotificationMessage: string = 'Lorem ipsum dolor sit amet.';
	const testNotificationId: string = 'FAKE_ID';

	it ( 'should set the custom options', () => {

		const testNotifierNotification: NotifierNotification = new NotifierNotification( {
			id: testNotificationId,
			message: testNotificationMessage,
			type: testNotificationType
		} );

		expect( testNotifierNotification.type ).toBe( testNotificationType );
		expect( testNotifierNotification.message ).toBe( testNotificationMessage );
		expect( testNotifierNotification.id ).toBe( testNotificationId );

	} );

	it ( 'should generate a notification ID automatically, if not defined', () => {

		// Mock the date (as the ID generation is based on it)
		const mockDate: MockDate = new MockDate();
		// tslint:disable no-any
		jest.spyOn( <any> window, 'Date' ).mockImplementation( () => mockDate );
		// tslint:enable no-any

		const testNotifierNotification: NotifierNotification = new NotifierNotification( {
			message: testNotificationMessage,
			type: testNotificationType
		} );

		expect( testNotifierNotification.type ).toBe( testNotificationType );
		expect( testNotifierNotification.message ).toBe( testNotificationMessage );
		expect( testNotifierNotification.id ).toBe( `ID_${ mockDate.getTime() }` );

	} );

} );

/**
 * Mock current time
 */
const mockCurrentTime: number = 1482312338350;

/**
 * Mock Date
 */
class MockDate extends Date {

	/**
	 * Get the time - always returns the same value, useful for comparison
	 */
	public getTime(): number {
		return mockCurrentTime;
	}

}
