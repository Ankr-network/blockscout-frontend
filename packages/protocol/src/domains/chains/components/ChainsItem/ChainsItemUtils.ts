import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { setOriginChainURL } from 'domains/chains/store/chainsSlice';
import { INDEX_PATH } from 'domains/chains/routes';

export const useHandleClick = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(setOriginChainURL(INDEX_PATH));
  }, [dispatch]);
};
