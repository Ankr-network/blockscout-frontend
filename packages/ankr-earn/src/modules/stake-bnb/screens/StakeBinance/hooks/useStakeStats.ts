import BigNumber from 'bignumber.js';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { useMemo } from 'react';

const getYearlyEarning = (amount: number, apy: number): number =>
  (amount * apy) / 100;

export const useStakeStats = (
  amount: number,
  apy: BigNumber,
): IStakeStatsItem[] => {
  const apyVal: number = useMemo(
    () => apy.multipliedBy(100).decimalPlaces(DEFAULT_ROUNDING).toNumber(),
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
        value: t('unit.token-value', {
          token: t('unit.bnb'),
          value: getYearlyEarning(amount, apyVal),
        }),
      },
    ],
    [amount, apyVal],
  );
};
