import React, { useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { ChainsItem } from './ChainsItem';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';

const TIMEFRAME = '30d';

export const ChainsItemQuery = ({
  chainId,
  ...otherProps
}: ChainsItemQueryProps) => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchChainDetails(chainId, TIMEFRAME));
  }, [dispatchRequest, chainId]);

  const { loading, data: chainInfo } = useQuery({
    type: fetchChainDetails.toString(),
    requestKey: chainId,
  });

  return (
    <ChainsItem
      totalRequests={chainInfo?.totalRequests.toString() ?? ''}
      isLoading={loading}
      {...otherProps}
    />
  );
};
