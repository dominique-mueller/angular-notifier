import 'jest-preset-angular';

// This file contains global mocks

// Very cheap way of making the Web Animations API work in Jest. Every element gets a 'animate' method, making it compatible with the Web
// Animations APi calls. However, we essentially do nothing in the method - which is absolutely fine, as every 'elmeent.animate' call gets
// mocked away by Jest anyway.

// tslint:disable no-any
( <any> window ).Element.prototype.animate = ( keyframes: any, options: any ): any => {
	// Nothing to implement
};
// tslint:enable no-any
