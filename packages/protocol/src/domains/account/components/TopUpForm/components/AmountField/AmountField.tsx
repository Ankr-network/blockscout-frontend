import { Field, useFormState } from 'react-final-form';
import { FormApi } from 'final-form';
import { FormGroup, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { AmountValidator } from 'domains/account/components/TopUpForm/types';
import { Currency } from 'domains/account/components/TopUp/types';
import { InputField } from 'modules/form/components/InputField';
import { OnChange } from 'modules/form/utils/OnChange';

import { DefaultFormValues } from './types';
import { MAX_DECIMALS_DEFAULT, MAX_LENGTH_DEFAULT } from './constants';
import { normalizeAmount } from './utils/normalizeAmount';
import { useAmountFieldStyles } from './AmountFieldStyles';
import { useCredits } from './hooks/useCredits';
import { validateAmount } from './utils/validateAmount';

export interface AmountFieldProps<
  Values extends DefaultFormValues,
  Name extends keyof DefaultFormValues,
> {
  amount: string;
  change?: FormApi<Values>['change'];
  className?: string;
  currency: Currency;
  isBundlePayment?: boolean;
  isDisabled?: boolean;
  isUSD?: boolean;
  maxDecimals?: number;
  maxLength?: number;
  name: Name;
  size?: 'm' | 'l';
  validate?: AmountValidator;
}

export const AmountField = <
  Values extends DefaultFormValues,
  Name extends keyof DefaultFormValues,
>({
  amount,
  change,
  className,
  currency,
  isBundlePayment,
  isDisabled,
  isUSD,
  maxDecimals = MAX_DECIMALS_DEFAULT,
  maxLength = MAX_LENGTH_DEFAULT,
  name,
  size = 'm',
  validate = validateAmount,
}: AmountFieldProps<Values, Name>) => {
  const { pristine } = useFormState();

  const credits = useCredits({ amount, currency });

  const { classes, cx } = useAmountFieldStyles({ isUSD, pristine, size });

  return (
    <FormGroup className={cx(classes.root, className)}>
      <Field
        component={InputField}
        disabled={isDisabled}
        isHelperTextVisible
        name={name}
        parse={value => normalizeAmount(value, maxDecimals)}
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={validate}
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.inputBase,
            input: classes.input,
            disabled: classes.disabled,
          },
          endAdornment: (
            <Typography variant="subtitle1" className={classes.subtitle}>
              {currency}
              {!isBundlePayment && (
                <span className={classes.credits}> {credits}</span>
              )}
            </Typography>
          ),
          inputProps: { maxLength },
        }}
      />
      {change && (
        <OnChange name={name}>
          {(value: string) => {
            change(name, normalizeAmount(value, maxDecimals));
          }}
        </OnChange>
      )}
    </FormGroup>
  );
};
