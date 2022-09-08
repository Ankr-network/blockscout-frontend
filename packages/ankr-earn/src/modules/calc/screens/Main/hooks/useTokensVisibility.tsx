import { useCallback, useMemo, useState } from 'react';

import { TCalcToken } from 'modules/calc/types';

import { DEFAULT_TOKENS_VALUE, SUPPORTED_TOKENS } from '../../../const';

export interface ITokenVisibility {
  visible: boolean;
  token: TCalcToken;
}

const defaultVisibilityState: ITokenVisibility[] = SUPPORTED_TOKENS.map(
  token => {
    const specifiedValue = DEFAULT_TOKENS_VALUE[token];
    return {
      visible: !!specifiedValue,
      token,
    };
  },
);

export interface IUseTokensVisibility {
  state: ITokenVisibility[];
  visibleCount: number;
  handleRemove: (token: TCalcToken) => void;
  handleAdd: (token: TCalcToken) => void;
  setDefaultVisibilityState: () => void;
  updateState: (newState: ITokenVisibility[]) => void;
}

export const useTokensVisibility = (): IUseTokensVisibility => {
  const [tokensVisibility, setTokensVisibility] = useState(
    defaultVisibilityState,
  );

  const handleRemove = useCallback((token: TCalcToken) => {
    setTokensVisibility(prev => {
      return prev.map(state => {
        if (state.token === token) {
          state.visible = false;
        }
        return state;
      });
    });
  }, []);

  const handleAdd = useCallback((token: TCalcToken) => {
    setTokensVisibility(prev => {
      return prev.map(state => {
        if (state.token === token) {
          state.visible = true;
        }
        return state;
      });
    });
  }, []);

  const setDefaultVisibilityState = () =>
    setTokensVisibility(defaultVisibilityState);

  const visibleCount = useMemo(
    () => tokensVisibility.filter(({ visible }) => visible).length,
    [tokensVisibility],
  );

  return {
    state: tokensVisibility,
    visibleCount,
    handleRemove,
    handleAdd,
    updateState: setTokensVisibility,
    setDefaultVisibilityState,
  };
};
