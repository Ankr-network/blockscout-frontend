import { FormProps } from 'react-final-form';
import { useCallback, useMemo } from 'react';

import { AmountFormValues, TopUpCurrency } from '../types';
import { NativeAmountForm } from '../components/NativeAmountForm';
import { getAmountMaxDigits } from '../utils/getAmountMaxDigits';
import { getTopUpAction } from '../utils/getTopUpAction';
import { isUSD as isUSDCurrency } from '../utils/isUSD';
import { useAmountParser } from './useAmountParser';
import { useConnectButton } from './useConnectButton';
import { useInitialAmount } from './useInitialAmount';
import { useOnSubmit } from './useOnSubmit';
import { useTopUpTransaction } from './useTopUpTransaction';
import { useValidator } from './useValidator';

type RenderCallback = NonNullable<FormProps<AmountFormValues>['render']>;

export interface AmountParams {
  currency: TopUpCurrency;
  fixedUSDAmount?: string;
  openEmailDialog: () => void;
  shouldOpenEmailDialog: boolean;
  usdPrice?: string;
}

export const useAmount = ({
  currency,
  fixedUSDAmount,
  openEmailDialog,
  shouldOpenEmailDialog,
  usdPrice,
}: AmountParams) => {
  const isUSD = useMemo(() => isUSDCurrency(currency), [currency]);

  const { isUSDTopUpLoading, onSubmit } = useOnSubmit({
    currency,
    openEmailDialog,
    shouldOpenEmailDialog,
    usdPrice,
  });

  const { isTopUpInProcess: isAnkrTopUpInProcess } = useTopUpTransaction();
  const topUpAction = getTopUpAction({
    currency,
    fixedUSDAmount,
    isAnkrTopUpInProcess,
  });

  const parse = useAmountParser(isUSD);
  const validate = useValidator(isUSD);

  const isAmountFieldDisabled = Boolean(
    isUSD ? fixedUSDAmount : isAnkrTopUpInProcess,
  );

  const { hasConnectButton, buttonText } = useConnectButton();

  const render: RenderCallback = useCallback(
    ({ handleSubmit, modified, valid, validating, values: { amount } }) => (
      <NativeAmountForm
        amount={amount}
        buttonText={buttonText}
        currency={currency}
        isAmountFieldDisabled={isAmountFieldDisabled}
        isLoading={isUSD && isUSDTopUpLoading}
        isModified={modified?.amount}
        maxLength={getAmountMaxDigits(isUSD)}
        onSubmit={handleSubmit}
        parse={parse}
        shouldConnectWallet={!isUSD && hasConnectButton}
        topUpAction={topUpAction}
        valid={!valid}
        validate={validate}
        validating={validating}
      />
    ),
    [
      buttonText,
      currency,
      hasConnectButton,
      isAmountFieldDisabled,
      isUSD,
      isUSDTopUpLoading,
      parse,
      topUpAction,
      validate,
    ],
  );

  const amount = useInitialAmount({ fixedUSDAmount, isUSD });

  return { initialValues: { amount }, render, onSubmit };
};
