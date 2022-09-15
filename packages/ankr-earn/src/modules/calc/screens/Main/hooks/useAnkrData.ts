import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy as getMaxAnkrApy } from 'modules/stake-ankr/actions/getMaxApy';

interface IUseAnkrData {
  isLoading: boolean;
  apy: BigNumber;
  usdTokenPrice: BigNumber;
}

export const useAnkrData = (): IUseAnkrData => {
  const { data: ankrApyData, loading: isAnkrApyLoading } = useQuery({
    type: getMaxAnkrApy,
  });

  const { data: ankrPriceData, loading: isAnkrPriceLoading } = useQuery({
    type: getANKRPrice,
  });

  return {
    isLoading: isAnkrApyLoading || isAnkrPriceLoading,
    apy: ankrApyData ?? ZERO,
    usdTokenPrice: ankrPriceData ?? ZERO,
  };
};
