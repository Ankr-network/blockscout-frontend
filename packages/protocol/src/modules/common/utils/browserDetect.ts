import Bowser from 'bowser';

export const browser = Bowser.getParser(window.navigator.userAgent);

export const isFirefox = (): boolean =>
  browser.getBrowserName(true).includes('firefox');
