import BigNumber from 'bignumber.js';

export const i18nKeyRoot = 'account.account-details.balance';

export const formatNumber = (number: BigNumber) => {
  return number.toFormat();
};
