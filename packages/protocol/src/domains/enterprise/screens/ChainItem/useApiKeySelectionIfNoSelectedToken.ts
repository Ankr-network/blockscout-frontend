import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { setSelectedTokenIndex } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { EnterpriseClientJwtManagerItem } from 'domains/enterprise/store/selectors';

interface UseApiKeySelectionIfNoSelectedTokenProps {
  apiKeys: EnterpriseClientJwtManagerItem[];
  hasChainData: boolean;
}

export const useApiKeySelectionIfNoSelectedToken = ({
  apiKeys,
  hasChainData,
}: UseApiKeySelectionIfNoSelectedTokenProps) => {
  const { address, tokenIndex } = useTokenManagerConfigSelector();

  const dispatch = useDispatch();

  const { push } = useHistory();

  useEffect(() => {
    if (!tokenIndex || tokenIndex === -1 || !hasChainData) {
      const newTokenIndex = apiKeys[0]?.index;

      dispatch(setSelectedTokenIndex({ tokenIndex: newTokenIndex, address }));

      if (typeof newTokenIndex !== 'number') {
        return push(EnterpriseRoutesConfig.chains.generatePath());
      }
    }

    return () => {};
  }, [tokenIndex, dispatch, apiKeys, address, hasChainData, push]);
};
