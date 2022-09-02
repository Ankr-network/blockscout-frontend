import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getActiveStakingData } from 'modules/stake-mgno/actions/getActiveStakingData';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { IActiveStakingData } from 'modules/stake-mgno/api/GnosisStakingSDK/types';

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | null;
}

export const useActiveStakingData = (): IActiveStaking => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading } = useQuery({
    type: getActiveStakingData,
  });
  const { data: usdPrice, loading: isUsdPriceLoading } = useQuery({
    type: getMGNOPrice,
  });

  useProviderEffect(() => {
    dispatchRequest(getActiveStakingData({ usdPrice: usdPrice ?? ZERO }));
  }, [dispatchRequest, usdPrice]);

  return {
    isLoading: loading || isUsdPriceLoading,
    data,
  };
};
