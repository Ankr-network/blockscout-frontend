import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

export const renderUSDFee = (rawFee: number) => {
  const fee = new BigNumber(rawFee).toFixed(1);

  return t('account.amounts.fee.usd', { fee });
};
