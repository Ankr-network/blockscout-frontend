import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

import { AmountInputField } from '../ANKRTopUpFormTypes';

export const useInitialValues = (
  hasLoginStep = false,
  defaultInitialValues = {},
) => {
  const transaction = useSelectTopUpTransaction();

  const isTopUpInProcess = Boolean(
    transaction?.allowanceTransactionHash ||
      transaction?.topUpTransactionHash ||
      hasLoginStep,
  );

  const initialValues = useMemo(() => {
    if (isTopUpInProcess) {
      return {
        [AmountInputField.amount]: new BigNumber(
          transaction?.amount ?? 0,
        ).toString(10),
      };
    }

    return defaultInitialValues;
  }, [transaction?.amount, isTopUpInProcess, defaultInitialValues]);

  return { transaction, isTopUpInProcess, initialValues };
};
