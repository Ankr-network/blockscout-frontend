import BigNumber from 'bignumber.js';
import { ReactText } from 'react';
import { ZERO } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { YEARLY_INTEREST } from '../../../const';

export const useStakeStats = (amount: ReactText) => {
  const stats: IStakeStatsItem[] = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: `${YEARLY_INTEREST}%`,
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.ftm'),
        value: calcYearlyEarning(amount).toFormat(),
      },
    ],
    [amount],
  );

  return stats;
};

const calcYearlyEarning = (amount: ReactText): BigNumber => {
  return amount
    ? new BigNumber(amount).multipliedBy(YEARLY_INTEREST).dividedBy(100)
    : ZERO;
};
