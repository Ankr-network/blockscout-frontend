// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import intl from 'react-intl-universal';
import '@testing-library/jest-dom';

import { locales } from './modules/i18n';

intl.init({
  currentLocale: 'en-US',
  locales,
  fallbackLocale: 'en-US',
});
