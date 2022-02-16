import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { useProviderEffect } from '../../../../auth/hooks/useProviderEffect';
import { fetchAPY } from '../../../actions/fetchAPY';

export const useStakeStats = (amount: number) => {
  const dispatchRequest = useDispatchRequest();
  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);

  const { data } = useQuery({ type: fetchAPY });
  const APY = data ? data.toNumber() : 0;

  const stats: IStakeStatsItem[] = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: APY }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        value: t('unit.token-value', {
          token: t('unit.polygon'),
          value: calcYearlyEarning(amount, APY),
        }),
      },
    ],
    [amount, APY],
  );

  return stats;
};

const calcYearlyEarning = (amount: number, apy: number): number => {
  return (amount * apy) / 100;
};
