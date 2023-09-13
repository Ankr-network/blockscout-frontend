import { useMemo, useState } from 'react';
import { BlockchainID } from 'multirpc-sdk';

import { useApiKeys } from './useApiKeys';

export const useEnterpriseEndpoints = (chainId?: BlockchainID) => {
  const { apiKeys, isLoading } = useApiKeys(chainId);

  const [openedEndpointIndex, setOpenedEndpointIndex] = useState(-1);

  const openedEndpoint = useMemo(
    () => apiKeys.find(item => item.index === openedEndpointIndex),
    [apiKeys, openedEndpointIndex],
  );

  return {
    apiKeys,
    isLoading,

    openedEndpoint,
    setOpenedEndpointIndex,
  };
};
