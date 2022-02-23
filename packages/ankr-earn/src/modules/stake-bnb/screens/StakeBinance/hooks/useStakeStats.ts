import BigNumber from 'bignumber.js';
import { useMemo, ReactText } from 'react';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';

const calculateYearlyEarning = (amount: ReactText, apy: string): BigNumber =>
  new BigNumber(amount).multipliedBy(apy).dividedBy(100);

export const useStakeStats = (
  amount: number,
  apy: BigNumber,
): IStakeStatsItem[] => {
  const apyVal = useMemo(
    () => apy.decimalPlaces(DEFAULT_ROUNDING).toFixed(),
    [apy],
  );

  return useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: `${apyVal}%`,
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.bnb'),
        value: calculateYearlyEarning(amount, apyVal).toFormat(),
      },
    ],
    [amount, apyVal],
  );
};
