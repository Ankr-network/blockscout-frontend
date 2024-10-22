import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';

import { selectEnterpriseApiKeysAsJWTs } from '../store/selectors';
import { useTokenManagerConfigSelector } from '../../jwtToken/hooks/useTokenManagerConfigSelector';

export const useEnterpriseSelectedToken = () => {
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { apiKeys = [] } = useAppSelector(selectEnterpriseApiKeysAsJWTs);

  const userEndpointToken = useMemo(() => {
    return apiKeys.find(apiKey => apiKey.index === tokenIndex)
      ?.userEndpointToken;
  }, [apiKeys, tokenIndex]);

  return { userEndpointToken };
};
