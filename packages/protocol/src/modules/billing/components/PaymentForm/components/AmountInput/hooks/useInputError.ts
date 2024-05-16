import { useCallback, useState } from 'react';

import { renderAmountError } from '../utils/renderAmountError';

export interface IUseInputErrorProps {
  minAmount: number;
}

export const useInputError = ({ minAmount }: IUseInputErrorProps) => {
  const [error, setError] = useState<string>();

  const validateAmount = useCallback(
    (amount: string) => {
      const amountError = renderAmountError({ amount, minAmount });

      setError(amountError);

      return amountError;
    },
    [minAmount],
  );

  const resetError = useCallback(() => setError(undefined), []);

  return { error, validateAmount, resetError };
};
