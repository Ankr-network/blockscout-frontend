import Bowser from 'bowser';

export const browser = Bowser.getParser(window.navigator.userAgent);
export const browserName = browser.getBrowserName();

export const isFirefox = (): boolean =>
  browser.getBrowserName(true).includes('firefox');

// browser features

// https://github.com/MetaMask/metamask-extension/issues/11377
export const isAddNetworkSupported = (): boolean => !isFirefox();
