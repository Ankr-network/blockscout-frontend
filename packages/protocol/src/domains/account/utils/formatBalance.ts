import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';

// to prevent layout breaking
const MAX_BALANCE_LENGTH = 6;
const MAX_DECIMALS_LENGTH = 2;

export const formatBalance = (balance: BigNumber) => {
  const decimals = Math.min(MAX_DECIMALS_LENGTH, balance.dp());
  const balanceLength = balance.integerValue().toString().length;

  return balanceLength > MAX_BALANCE_LENGTH
    ? t('account.balance', { balance: balance.toString() })
    : balance.toFormat(decimals);
};
