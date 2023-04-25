import { useHistory, useLocation } from 'react-router';
import { useCallback, useEffect } from 'react';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { ChainID } from 'domains/chains/types';

export const useRedirectToAdvancedApi = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const isMultiChain = pathname.includes(ChainID.MULTICHAIN);

  const redirectToAdvancedApi = useCallback(() => {
    if (!isMultiChain) {
      return;
    }

    push(AdvancedApiRoutesConfig.advancedApi.generatePath());
  }, [isMultiChain, push]);

  useEffect(() => {
    if (!isMultiChain) {
      return;
    }

    redirectToAdvancedApi();
  }, [isMultiChain, redirectToAdvancedApi]);
};
