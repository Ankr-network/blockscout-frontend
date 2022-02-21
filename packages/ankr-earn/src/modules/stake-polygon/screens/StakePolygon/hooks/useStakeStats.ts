import BigNumber from 'bignumber.js';
import { ReactText } from 'react';
import { ZERO } from 'modules/common/const';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { useProviderEffect } from '../../../../auth/hooks/useProviderEffect';
import { fetchAPY } from '../../../actions/fetchAPY';

export const useStakeStats = (amount: ReactText): IStakeStatsItem[] => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);

  const { data } = useQuery({ type: fetchAPY });
  const APY = data ? data.toNumber() : 0;

  const stats = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: APY }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.polygon'),
        value: calcYearlyEarning(amount, APY).toFormat(),
      },
    ],
    [amount, APY],
  );

  return stats;
};

const calcYearlyEarning = (amount: ReactText, apy: number): BigNumber => {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
};
