import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ANKR_1INCH_BUY_LINK, ZERO } from 'modules/common/const';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';

interface IUseHeader {
  balance?: BigNumber;
  isLoading: boolean;
  getTokensLink: string;
}

export const useHeader = (): IUseHeader => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const balance = data?.ankrBalance ?? ZERO;

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
  }, [dispatchRequest]);

  return {
    balance,
    isLoading: loading,
    getTokensLink: ANKR_1INCH_BUY_LINK,
  };
};
