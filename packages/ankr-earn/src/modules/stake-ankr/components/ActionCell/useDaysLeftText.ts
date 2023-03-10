import { t } from '@ankr.com/common';

import { Days } from 'modules/common/types';

/**
 * Returns text for days left
 *
 * @param {Days} daysLeft - the number of days left
 * @example
 * useDaysLeftText(1.5) // '1 day left'
 * useDaysLeftText(0.5) // 'less than 1 day left'
 * useDaysLeftText(2) // '2 days left'
 */
export const useDaysLeftText = (daysLeft: Days): string => {
  if (daysLeft < 1) {
    return t('stake-ankr.staking-table.less-than-one-day');
  }
  const intDaysLeft = Math.floor(daysLeft);
  if (intDaysLeft === 1) {
    return t('stake-ankr.staking-table.left-day', { value: intDaysLeft });
  }

  return t('stake-ankr.staking-table.left-days', { value: intDaysLeft });
};
