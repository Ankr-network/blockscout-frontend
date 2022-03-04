import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText } from 'react';

import { ZERO } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';

const calculateYearlyEarning = (
  amount: ReactText,
  apy: ReactText,
): BigNumber => {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
};

export const useStakeStats = (amount: ReactText): IStakeStatsItem[] => {
  const { data: apyData } = useQuery({ type: getAPY });
  const APY = apyData ? apyData.toNumber() : 0;

  const stats = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: APY }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.ftm'),
        value: calculateYearlyEarning(amount, APY).toFormat(),
      },
    ],
    [amount, APY],
  );

  return stats;
};
