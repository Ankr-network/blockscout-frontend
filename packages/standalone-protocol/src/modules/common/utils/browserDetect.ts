import Bowser from 'bowser';

export const browser = Bowser.getParser(window.navigator.userAgent);
export const browserName = browser.getBrowserName();

export const isSafari = () => browser.getBrowserName(true).includes('safari');

export const isAddNetworkSupported = (isMDDown: boolean): boolean => {
  return !isMDDown;
};
