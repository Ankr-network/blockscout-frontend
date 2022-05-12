import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';

// to pervent layout breaking
const MAX_BALANCE_LENGHT = 6;

export const i18nKeyRoot = 'account.account-details.balance';

export const formatNumber = (number: BigNumber) => number.toFormat();

export const formatBalance = (balance_: BigNumber) => {
  const balance = balance_.toString();

  return balance.length > MAX_BALANCE_LENGHT
    ? t(`${i18nKeyRoot}.balance`, { balance })
    : formatNumber(balance_);
};
