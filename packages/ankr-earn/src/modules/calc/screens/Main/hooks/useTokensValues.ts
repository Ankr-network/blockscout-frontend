import { ReactText, useCallback, useState } from 'react';

import { TCalcToken } from 'modules/calc/types';

import { DEFAULT_TOKENS_VALUE, SUPPORTED_TOKENS } from '../../../const';

export type TFormValues = Record<TCalcToken, ReactText>;

export const defaultValuesState = SUPPORTED_TOKENS.reduce((acc, token) => {
  const specifiedValue = DEFAULT_TOKENS_VALUE[token];
  acc[token] = specifiedValue ?? 0;
  return acc;
}, {} as TFormValues);

interface IUseTokensValues {
  state: TFormValues;
  setTokenValue: (value: ReactText, token: TCalcToken) => void;
  updateState: (newState: TFormValues) => void;
  setDefaultState: () => void;
}

export const useTokensValues = (): IUseTokensValues => {
  const [state, setState] = useState<TFormValues>(defaultValuesState);

  const setTokenValue = useCallback((value: ReactText, token: TCalcToken) => {
    setState(prevState => ({
      ...prevState,
      [token]: value,
    }));
  }, []);

  const setDefaultState = () => setState(defaultValuesState);

  return {
    state,
    setTokenValue,
    setDefaultState,
    updateState: setState,
  };
};
