import { useMemo } from 'react';
import { BlockchainID } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseApiKeysAsJwtManagerTokens } from 'domains/enterprise/store/selectors';

export const useApiKeys = (chainId?: BlockchainID) => {
  const { apiKeys = [], isLoading } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  const filteredApiKeys = useMemo(
    () =>
      apiKeys.filter(apiKey =>
        apiKey.blockchains?.some(({ blockchain }) => blockchain === chainId),
      ),
    [apiKeys, chainId],
  );

  return {
    apiKeys: chainId ? filteredApiKeys : apiKeys,
    isLoading,
  };
};
