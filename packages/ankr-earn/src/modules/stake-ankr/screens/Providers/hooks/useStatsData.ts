import { DEFAULT_ROUNDING } from 'modules/common/const';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { useGetMaxApyQuery } from 'modules/stake-ankr/actions/getMaxApy';
import { useGetProvidersTotalInfoQuery } from 'modules/stake-ankr/actions/getProvidersTotalInfo';
import { TEMPORARY_APY } from 'modules/stake-ankr/const';

import { CACHE_SECONDS } from '../const';

interface IStatsData {
  highestAPY: string;
  apyLoading: boolean;
  tvl?: string;
  lockingPeriod?: number;
  rewards24h?: string;
  rewards30d?: string;
  statsLoading: boolean;
}

export const useStatsData = (): IStatsData => {
  const { data, isFetching: statsLoading } = useGetProvidersTotalInfoQuery(
    undefined,
    {
      refetchOnMountOrArgChange: CACHE_SECONDS,
    },
  );
  const { data: maxApy, isFetching: apyLoading } = useGetMaxApyQuery(
    undefined,
    { refetchOnMountOrArgChange: CACHE_SECONDS },
  );
  const tvl = data?.totalTVL;

  return {
    highestAPY:
      maxApy?.decimalPlaces(DEFAULT_ROUNDING).toFormat() ??
      TEMPORARY_APY.toFormat(),
    apyLoading,
    tvl: tvl ? getShortNumber(tvl) : undefined,
    lockingPeriod: data ? data.lockingPeriod : undefined,
    statsLoading,
  };
};
