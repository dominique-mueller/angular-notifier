import 'jest-preset-angular';

// This file contains global mocks

global['CSS'] = null;

const mock = () => {
  let storage = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: any) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

// Very cheap way of making the Web Animations API work in Jest. Every element gets a 'animate' method, making it compatible with the Web
// Animations APi calls. However, we essentially do nothing in the method - which is absolutely fine, as every 'elmeent.animate' call gets
// mocked away by Jest anyway.

(<any>window).Element.prototype.animate = (): any => {
  // Nothing to implement
};
