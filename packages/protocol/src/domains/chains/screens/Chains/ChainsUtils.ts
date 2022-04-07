import { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { resetRequests } from '@redux-requests/core';

import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

// TODO: use for TotalRequests component
// eslint-disable-next-line
const calcuateTotalRequest = (chainInfo: any[]): BigNumber => {
  const allRequsts = chainInfo
    ?.map((item: any) => item.totalRequests)
    .reduce(
      (request: BigNumber, totalRequests: BigNumber) =>
        request.plus(totalRequests),
      new BigNumber(0),
    );

  return allRequsts;
};

export const usePublicChainsInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicChainsInfo());
  }, [dispatch]);

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPublicChainsInfo.toString()]));
  });
};
