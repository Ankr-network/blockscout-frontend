import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { useGetNetworkChooserDataQuery } from 'modules/stake-matic/common/actions/getNetworkChooserData';

interface IUseNetworkChooserData {
  ethBalance: BigNumber;
  polygonBalance: BigNumber;
}

export const useNetworkChooser = (): IUseNetworkChooserData => {
  const { data, refetch } = useGetNetworkChooserDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const ethBalance = data?.maticEthBalance ?? ZERO;
  const polygonBalance = data?.maticPolygonBalance ?? ZERO;

  useProviderEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ethBalance,
    polygonBalance,
  };
};
