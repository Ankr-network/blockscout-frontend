import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedTokenIndex } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useTokenManagerConfigSelector } from './useTokenManagerConfigSelector';

export const useSelectTokenIndex = () => {
  const dispatch = useDispatch();

  const { address, tokenIndex } = useTokenManagerConfigSelector();

  const [currentTokenIndex, setIndex] = useState(tokenIndex);

  const handleTokenIndexSelect = useCallback(
    (newIndex: number) => {
      setIndex(newIndex);
      dispatch(setSelectedTokenIndex({ tokenIndex: newIndex, address }));
    },
    [dispatch, address],
  );

  return {
    tokenIndex: currentTokenIndex,
    handleTokenIndexSelect,
  };
};
