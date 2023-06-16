import Bowser from 'bowser';

export const browser = Bowser.getParser(window.navigator.userAgent);
export const browserName = browser.getBrowserName();

export const isFirefox = (): boolean =>
  browser.getBrowserName(true).includes('firefox');

export const isSafari = () => browser.getBrowserName(true).includes('safari');

// browser features

// https://github.com/MetaMask/metamask-extension/issues/11377
export const isAddNetworkSupported = (isMDDown: boolean): boolean => {
  return !isMDDown && !isFirefox();
};
