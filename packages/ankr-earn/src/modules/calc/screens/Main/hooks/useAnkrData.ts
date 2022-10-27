import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetMaxApyQuery } from 'modules/stake-ankr/actions/getMaxApy';
import { CACHE_SECONDS } from 'modules/stake-ankr/screens/Providers/const';

interface IUseAnkrData {
  isLoading: boolean;
  apy: BigNumber;
  usdTokenPrice: BigNumber;
}

export const useAnkrData = (): IUseAnkrData => {
  const { data: ankrApyData, isFetching: isAnkrApyLoading } = useGetMaxApyQuery(
    undefined,
    { refetchOnMountOrArgChange: CACHE_SECONDS },
  );

  const { data: ankrPriceData, isFetching: isAnkrPriceLoading } =
    useGetAnkrPriceQuery(undefined, {
      refetchOnMountOrArgChange: CACHE_SECONDS,
    });

  return {
    isLoading: isAnkrApyLoading || isAnkrPriceLoading,
    apy: ankrApyData ?? ZERO,
    usdTokenPrice: ankrPriceData ?? ZERO,
  };
};
