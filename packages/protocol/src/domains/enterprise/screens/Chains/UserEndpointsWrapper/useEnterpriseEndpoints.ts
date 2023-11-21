import { useMemo, useState } from 'react';

import { Chain } from 'modules/chains/types';

import { useApiKeys } from './useApiKeys';

export const useEnterpriseEndpoints = (chain?: Chain) => {
  const { apiKeys, isLoading } = useApiKeys(chain);

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
