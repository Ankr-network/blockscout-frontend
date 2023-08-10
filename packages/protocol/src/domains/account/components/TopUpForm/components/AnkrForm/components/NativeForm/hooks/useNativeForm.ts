import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

const MILLION_ANKR_TOKENS = 1_000_000;

export interface NativeFormParams {
  amount: string;
  valid: boolean;
}

export const useNativeForm = ({ amount, valid }: NativeFormParams) => {
  const hasInfo = useMemo(
    () =>
      valid &&
      new BigNumber(amount || 0).isGreaterThanOrEqualTo(MILLION_ANKR_TOKENS),
    [amount, valid],
  );

  return { hasInfo };
};
