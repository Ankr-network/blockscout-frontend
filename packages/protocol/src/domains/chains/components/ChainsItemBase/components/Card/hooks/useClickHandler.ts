import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { ChainID } from 'modules/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { setOriginChainURL } from 'domains/chains/store/chainsSlice';

export const useClickHandler = (chainId: ChainID) => {
  const dispatch = useDispatch();
  const {
    location: { pathname },
    push,
  } = useHistory();

  return useCallback(() => {
    dispatch(setOriginChainURL(pathname));

    push(ChainsRoutesConfig.chainDetails.generatePath(chainId));
  }, [chainId, dispatch, pathname, push]);
};
