import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedTokenIndex } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import { useTokenManagerConfigSelector } from './useTokenManagerConfigSelector';

const UNSELECTED_TOKEN_INDEX = -1;

export const useSelectTokenIndex = (isUnselectAvailable?: boolean) => {
  const dispatch = useDispatch();

  const { address, tokenIndex } = useTokenManagerConfigSelector();

  const [currentTokenIndex, setIndex] = useState(tokenIndex);

  const handleSelectTokenIndex = useCallback(
    (newIndex: number) => {
      const shouldUnselect =
        isUnselectAvailable && newIndex === currentTokenIndex;

      if (shouldUnselect) {
        setIndex(UNSELECTED_TOKEN_INDEX);
        dispatch(
          setSelectedTokenIndex({
            tokenIndex: UNSELECTED_TOKEN_INDEX,
            address,
          }),
        );
      } else {
        setIndex(newIndex);
        dispatch(setSelectedTokenIndex({ tokenIndex: newIndex, address }));
      }
    },
    [dispatch, address, isUnselectAvailable, currentTokenIndex],
  );

  return {
    tokenIndex: currentTokenIndex,
    handleSelectTokenIndex,
  };
};
