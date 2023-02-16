import BigNumber from 'bignumber.js';
import { FormProps } from 'react-final-form';
import { useCallback, useMemo } from 'react';

import { AmountFormValues, TopUpCurrency } from '../types';
import { isUSD as isUSDCurrency } from '../utils/isUSD';
import { useOnAnkrTopUpSuccess } from './useOnAnkrTopUpSuccess';
import { useOnUSDTopUpSuccess } from './useOnUSDTopUpSuccess';
import { useTopUp } from 'domains/account/hooks/useTopUp';

type SubmitCallback = FormProps<AmountFormValues>['onSubmit'];

export interface SubmitHandlerParams {
  currency: TopUpCurrency;
  openEmailDialog: () => void;
  shouldOpenEmailDialog: boolean;
  usdPrice?: string;
}

export const useOnSubmit = ({
  currency,
  openEmailDialog,
  shouldOpenEmailDialog,
  usdPrice,
}: SubmitHandlerParams) => {
  const { handleSetAmount } = useTopUp();

  const onAnkrTopUpSuccess = useOnAnkrTopUpSuccess();
  const { isLoading: isUSDTopUpLoading, onSuccess: onUSDTopUpSuccess } =
    useOnUSDTopUpSuccess();

  const isUSD = useMemo(() => isUSDCurrency(currency), [currency]);

  const onSuccess = isUSD ? onUSDTopUpSuccess : onAnkrTopUpSuccess;

  const onSubmit: SubmitCallback = useCallback(
    ({ amount }) => {
      if (!isUSD) {
        handleSetAmount(new BigNumber(amount));
      }

      if (shouldOpenEmailDialog) {
        openEmailDialog();
      } else {
        onSuccess({ amount, usdPrice });
      }
    },
    [
      handleSetAmount,
      isUSD,
      onSuccess,
      openEmailDialog,
      shouldOpenEmailDialog,
      usdPrice,
    ],
  );

  return { isUSDTopUpLoading, onSubmit };
};
