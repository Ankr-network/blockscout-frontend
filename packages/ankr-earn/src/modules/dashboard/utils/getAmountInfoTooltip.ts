import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

export const getAmountInfoTooltip = (
  nativeAmount?: BigNumber,
  usdAmount?: BigNumber,
): string | null => {
  const withNativeAmount = !!nativeAmount;
  const withUsdAmount = !!usdAmount;

  if (withNativeAmount && withUsdAmount) {
    return t('dashboard.amount-usd-tooltip');
  }

  if (withNativeAmount && !withUsdAmount) {
    return t('dashboard.amount-tooltip');
  }

  if (!withNativeAmount && withUsdAmount) {
    return t('dashboard.usd-tooltip');
  }

  return null;
};
