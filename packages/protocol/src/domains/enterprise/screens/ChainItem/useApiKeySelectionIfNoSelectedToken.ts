import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { setSelectedTokenIndex } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import {
  EnterpriseClientJwtManagerItem,
  selectEnterpriseApiKeysAsJwtManagerTokens,
} from 'domains/enterprise/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

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

  const { isLoading } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  useEffect(() => {
    const isTokenNotAvailable =
      !tokenIndex || tokenIndex === -1 || !hasChainData;

    if (isTokenNotAvailable && !isLoading) {
      const newTokenIndex = apiKeys[0]?.index;

      dispatch(setSelectedTokenIndex({ tokenIndex: newTokenIndex, address }));

      if (typeof newTokenIndex !== 'number') {
        return push(EnterpriseRoutesConfig.chains.generatePath());
      }
    }

    return () => {};
  }, [tokenIndex, dispatch, apiKeys, address, hasChainData, push, isLoading]);
};
