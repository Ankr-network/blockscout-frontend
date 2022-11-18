import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

export const getShortNumber = (number: BigNumber): string => {
  return t('format.number-compact', { value: number }).toLowerCase();
};
