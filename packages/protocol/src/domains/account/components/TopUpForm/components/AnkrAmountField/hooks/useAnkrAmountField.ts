import { useCallback } from 'react';

import { normalizeAmount } from '../utils/normalizeAmount';
import { useCredits } from './useCredits';

export interface AnkrAmountFieldParams {
  amount: string;
  maxDecimals: number;
}

export const useAnkrAmountField = ({
  amount,
  maxDecimals,
}: AnkrAmountFieldParams) => {
  const credits = useCredits(amount);

  const parse = useCallback(
    (value: string) => normalizeAmount(value, maxDecimals),
    [maxDecimals],
  );

  return { credits, parse };
};
