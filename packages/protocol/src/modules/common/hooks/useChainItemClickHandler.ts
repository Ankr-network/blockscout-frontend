import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Path } from 'history';

import { setOriginChainURL } from 'domains/chains/store/chainsSlice';

export const useChainItemClickHandler = (path: Path) => {
  const dispatch = useDispatch();
  const {
    location: { pathname, search },
    push,
  } = useHistory();

  return useCallback(() => {
    dispatch(setOriginChainURL(`${pathname}${search}`));

    push(path);
  }, [path, dispatch, pathname, search, push]);
};
