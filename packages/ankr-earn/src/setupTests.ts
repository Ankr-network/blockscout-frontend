// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import intl from 'react-intl-universal';

import { locales } from './modules/i18n';

intl.init({
  currentLocale: 'en-US',
  locales,
  fallbackLocale: 'en-US',
});

const sessionStorageMock = (function mock() {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string => {
      return store[key];
    },

    setItem: (key: string, value: unknown): void => {
      store[key] = String(value);
    },

    clear: (): void => {
      store = {};
    },

    removeItem: (key: string): void => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mocks for libraries
jest.mock('polkadot', () => jest.fn());
