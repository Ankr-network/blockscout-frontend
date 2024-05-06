import { useCallback, useState } from 'react';

import { renderAmountError } from '../utils/renderAmountError';

export interface IUseInputErrorProps {
  minAmount: number;
  isInteger?: boolean;
}

export const useInputError = ({
  minAmount,
  isInteger,
}: IUseInputErrorProps) => {
  const [error, setError] = useState<string>();

  const validateAmount = useCallback(
    (amount: string) => {
      const amountError = renderAmountError({ amount, minAmount, isInteger });

      setError(amountError);

      return amountError;
    },
    [minAmount, isInteger],
  );

  const resetError = useCallback(() => setError(undefined), []);

  return { error, validateAmount, resetError };
};
