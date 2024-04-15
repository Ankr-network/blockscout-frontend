import { useCallback, useState } from 'react';

import { ECurrency } from 'modules/billing/types';
import { MIN_ANKR_AMOUNT, MIN_USD_AMOUNT } from 'modules/billing/const';

import { renderAmountError } from '../utils/renderAmountError';

export interface IUseInputErrorProps {
  currency: ECurrency;
}

export const useInputError = ({ currency }: IUseInputErrorProps) => {
  const [error, setError] = useState<string>();

  const minAmount =
    currency === ECurrency.ANKR ? MIN_ANKR_AMOUNT : MIN_USD_AMOUNT;

  const validateAmount = useCallback(
    (amount: string) => {
      const amountError = renderAmountError({ amount, minAmount });

      setError(amountError);

      return amountError;
    },
    [minAmount],
  );

  return { error, validateAmount };
};
