import { FieldValidator } from 'final-form';
import { FormEventHandler } from 'react';

import { AmountField } from '../AmountField';
import { AmountParser } from '../../hooks/useAmountParser';
import { PricingLink } from '../PricingLink';
import { SubmitButton } from '../SubmitButton';
import { TopUpAction, TopUpCurrency } from '../../types';
import { useNativeAmountFormStyles } from './NativeAmountFormStyles';
import { useRate } from './hooks/useRate';

export interface NativeAmountFormProps {
  amount: string;
  buttonText?: string;
  currency: TopUpCurrency;
  isAmountFieldDisabled?: boolean;
  isLoading: boolean;
  isModified?: boolean;
  maxLength: number;
  onSubmit?: FormEventHandler;
  parse: AmountParser;
  shouldConnectWallet: boolean;
  topUpAction: TopUpAction;
  valid: boolean;
  validate: FieldValidator<string>;
  validating: boolean;
}

export const NativeAmountForm = ({
  amount,
  buttonText,
  currency,
  isAmountFieldDisabled,
  isLoading,
  isModified,
  maxLength,
  onSubmit,
  parse,
  shouldConnectWallet,
  topUpAction,
  valid,
  validate,
  validating,
}: NativeAmountFormProps) => {
  const rateProps = useRate({ amount, currency });

  const { classes } = useNativeAmountFormStyles();

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <AmountField
        amount={amount}
        className={classes.amountField}
        currency={currency}
        isDisabled={isAmountFieldDisabled || validating}
        isModified={isModified}
        maxLength={maxLength}
        parse={parse}
        rateProps={rateProps}
        validate={validate}
      />
      <PricingLink className={classes.pricingLink} />
      <SubmitButton
        action={topUpAction}
        buttonText={buttonText}
        isDisabled={validating || valid}
        isLoading={isLoading}
        shouldConnectWallet={shouldConnectWallet}
      />
    </form>
  );
};
