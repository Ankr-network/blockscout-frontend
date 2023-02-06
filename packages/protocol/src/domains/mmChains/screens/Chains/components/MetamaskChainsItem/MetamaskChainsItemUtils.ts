import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { INDEX_MM_PATH } from 'domains/mmChains/routes';
import { setOriginChainURL } from 'domains/chains/store/chainsSlice';

export const useHandleClick = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setOriginChainURL(INDEX_MM_PATH));
  }, [dispatch]);
};
