import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';

// to prevent layout breaking
const MAX_BALANCE_LENGTH = 6;
const MAX_DECIMALS_LENGTH = 2;

const MIN_DISPLAY_BALANCE = 0.01;

export const formatBalance = (balance: BigNumber) => {
  const decimals = Math.min(MAX_DECIMALS_LENGTH, balance.dp());
  const balanceLength = balance.integerValue().toString().length;

  return balanceLength > MAX_BALANCE_LENGTH
    ? t('account.balance', { balance: balance.toString() })
    : balance.toFormat(decimals);
};

export const renderBalance = (balance: BigNumber) => {
  const absBalance = balance.absoluteValue();

  return absBalance.isLessThan(MIN_DISPLAY_BALANCE)
    ? balance.precision(1).toFormat()
    : formatBalance(balance);
};
