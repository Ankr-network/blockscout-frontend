import BigNumber from 'bignumber.js';
import { useMemo, ReactText } from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';

const calculateYearlyEarning = (apy: string, amount?: ReactText): BigNumber =>
  amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;

export const useStakeStats = (
  apy: BigNumber,
  amount?: string,
): IStakeStatsItem[] => {
  const apyVal = useMemo(
    () => apy.decimalPlaces(DEFAULT_ROUNDING).toFixed(),
    [apy],
  );

  const items = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: `${apyVal}%`,
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.bnb'),
        value: calculateYearlyEarning(apyVal, amount).toFormat(),
      },
    ],
    [amount, apyVal],
  );

  return items;
};
