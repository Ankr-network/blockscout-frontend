import BigNumber from 'bignumber.js';

import { t } from 'common';

export const getShortNumber = (number: BigNumber): string => {
  return t('format.number-compact', { value: number }).toLowerCase();
};
