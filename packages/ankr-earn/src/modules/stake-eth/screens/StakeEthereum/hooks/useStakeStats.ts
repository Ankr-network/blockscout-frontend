import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { calcYearlyEarning } from 'modules/stake/utils/calcYearlyEarning';

export const useStakeStats = (amount: BigNumber): IStakeStatsItem[] => {
  const { data: APYData } = useQuery({
    type: getAPY,
  });

  const APY = APYData ?? 0;

  const stats = useLocaleMemo<IStakeStatsItem[]>(
    () => [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: APY }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.eth'),
        value: calcYearlyEarning(amount, APY).toFormat(),
      },
    ],
    [amount, APY],
  );

  return stats;
};
