import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { YEARLY_INTEREST } from '../../../const';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchAPY } from '../../../actions/fetchAPY';
import { useProviderEffect } from '../../../../auth/hooks/useProviderEffect';

export const useStakeStats = (amount: number) => {
  const dispatchRequest = useDispatchRequest();
  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);

  const { data: apy } = useQuery({ type: fetchAPY });

  const stats: IStakeStatsItem[] = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: apy ? t('stake.stats.apy-value', { value: apy.toNumber() }) : '',
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        value: t('unit.token-value', {
          token: t('unit.polygon'),
          value: calcYearlyEarning(amount),
        }),
      },
    ],
    [amount, apy],
  );

  return stats;
};

const calcYearlyEarning = (amount: number): number => {
  return (amount * YEARLY_INTEREST) / 100;
};
