import React, { useEffect } from 'react';
import { useDispatchRequest, useMutation } from '@redux-requests/react';

import { ChainsItem } from './ChainsItem';
import { ChainsItemQueryProps } from './ChainsItemTypes';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';

const TIMEFRAME = '30d';

export const ChainsItemQuery = ({
  chainId,
  chain,
  ...otherProps
}: ChainsItemQueryProps) => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchChainDetails(chainId, TIMEFRAME));
  }, [dispatchRequest, chainId]);

  const { loading } = useMutation({
    type: fetchChainDetails.toString(),
    requestKey: chainId,
  });

  return (
    <ChainsItem
      totalRequests={chain?.totalRequests?.toString() ?? ''}
      isLoading={loading}
      chain={chain}
      {...otherProps}
    />
  );
};
