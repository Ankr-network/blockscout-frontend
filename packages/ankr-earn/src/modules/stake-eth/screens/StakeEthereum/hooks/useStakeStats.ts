import { ReactText } from 'react';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { DEMO_APY } from 'modules/stake-eth/const';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { calcYearlyEarning } from 'modules/stake/utils/calcYearlyEarning';

export const useStakeStats = (amount: ReactText): IStakeStatsItem[] => {
  const stats = useLocaleMemo<IStakeStatsItem[]>(
    () => [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: DEMO_APY }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.eth'),
        value: calcYearlyEarning(amount, DEMO_APY).toFormat(),
      },
    ],
    [amount, DEMO_APY],
  );

  return stats;
};
