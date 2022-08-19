import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getNetworkChooserData } from 'modules/stake-matic/common/actions/getNetworkChooserData';

interface IUseNetworkChooserData {
  ethBalance: BigNumber;
  isDisabledEthLink: boolean;
  isDisabledPolygonLink: boolean;
  polygonBalance: BigNumber;
}

export const useNetworkChooser = (): IUseNetworkChooserData => {
  const dispatchRequest = useDispatchRequest();

  const { data } = useQuery({
    type: getNetworkChooserData,
  });

  const ethBalance = data?.maticEthBalance ?? ZERO;
  const polygonBalance = data?.maticPolygonBalance ?? ZERO;

  const isDisabledEthLink = ethBalance.isZero();
  const isDisabledPolygonLink = polygonBalance.isZero();

  useProviderEffect(() => {
    dispatchRequest(getNetworkChooserData());
  }, [dispatchRequest]);

  return {
    ethBalance,
    isDisabledEthLink,
    isDisabledPolygonLink,
    polygonBalance,
  };
};
