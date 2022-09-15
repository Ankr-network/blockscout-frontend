import { useCallback, useState } from 'react';

import { TCalcToken } from 'modules/calc/types';

import { DEFAULT_TOKENS_VALUE, SUPPORTED_TOKENS } from '../../../const';

export type TVisibilityState = Record<TCalcToken, boolean>;

const defaultVisibilityState = SUPPORTED_TOKENS.reduce((acc, token) => {
  const specifiedValue = DEFAULT_TOKENS_VALUE[token];
  acc[token] = !!specifiedValue;
  return acc;
}, {} as TVisibilityState);

export interface IUseTokensVisibility {
  state: TVisibilityState;
  setTokenVisibility: (token: TCalcToken, isVisible: boolean) => void;
  setDefaultVisibilityState: () => void;
  updateState: (newState: TVisibilityState) => void;
}

export const useTokensVisibility = (): IUseTokensVisibility => {
  const [tokensVisibility, setTokensVisibility] = useState(
    defaultVisibilityState,
  );

  const setTokenVisibility = useCallback(
    (token: TCalcToken, isVisible: boolean) => {
      setTokensVisibility(prev => ({
        ...prev,
        [token]: isVisible,
      }));
    },
    [],
  );

  const setDefaultVisibilityState = () =>
    setTokensVisibility(defaultVisibilityState);

  return {
    state: tokensVisibility,
    setTokenVisibility,
    updateState: setTokensVisibility,
    setDefaultVisibilityState,
  };
};
