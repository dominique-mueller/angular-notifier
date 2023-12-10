Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});

// Very cheap way of making the Web Animations API work in Jest. Every element gets a 'animate' method, making it compatible with the Web
// Animations APi calls. However, we essentially do nothing in the method - which is absolutely fine, as every 'elmeent.animate' call gets
// mocked away by Jest anyway.
(<any>window).Element.prototype.animate = (): any => {
  // Nothing to implement
};
