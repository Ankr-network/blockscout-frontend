import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';

import { useTokenManagerConfigSelector } from '../../jwtToken/hooks/useTokenManagerConfigSelector';
import { selectEnterpriseApiKeysAsJwtManagerTokens } from '../store/selectors';

export const useEnterpriseSelectedToken = () => {
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { apiKeys = [] } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  const userEndpointToken = useMemo(() => {
    return apiKeys.find(apiKey => apiKey.index === tokenIndex)
      ?.userEndpointToken;
  }, [apiKeys, tokenIndex]);

  return { userEndpointToken };
};
