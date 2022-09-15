import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { CONVERT_MGNO_MANUAL_LINK, ZERO } from 'modules/common/const';
import { getBalance } from 'modules/stake-mgno/actions/getBalance';

interface IUseHeader {
  balance?: BigNumber;
  isLoading: boolean;
  getTokensLink: string;
}

export const useHeader = (): IUseHeader => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data, loading } = useQuery({
    type: getBalance,
  });

  useProviderEffect(() => {
    dispatchRequest(getBalance());

    return () => {
      dispatch(resetRequests([getBalance.toString()]));
    };
  }, [dispatchRequest]);

  return {
    balance: data ?? ZERO,
    isLoading: loading,
    getTokensLink: CONVERT_MGNO_MANUAL_LINK,
  };
};
