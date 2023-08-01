import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

// to prevent layout breaking
const MAX_BALANCE_LENGTH = 6;
const MAX_DECIMALS_LENGTH = 2;

const MIN_DISPLAY_BALANCE = 0.01;

const formatBalance = (balance: BigNumber) => {
  const decimals = Math.min(MAX_DECIMALS_LENGTH, balance.dp());
  const balanceLength = balance.integerValue().toString().length;

  return balanceLength > MAX_BALANCE_LENGTH
    ? t('account.balance', { balance: balance.toString() })
    : balance.toFormat(decimals);
};

export const renderBalance = (balance: string) => {
  const balanceNumber = new BigNumber(balance);

  const absBalance = balanceNumber.absoluteValue();

  return absBalance.isLessThan(MIN_DISPLAY_BALANCE)
    ? balanceNumber.precision(1).toFormat()
    : formatBalance(balanceNumber);
};
