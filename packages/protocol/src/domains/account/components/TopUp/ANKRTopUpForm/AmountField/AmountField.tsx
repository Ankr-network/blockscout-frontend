import { FormGroup, Typography } from '@mui/material';
import { Field, useFormState } from 'react-final-form';
import { t } from '@ankr.com/common';

import { InputField } from 'modules/form/components/InputField';
import { useAmountFieldStyles } from './AmountFieldStyles';
import {
  MAX_DECIMALS,
  MAX_LENGTH,
  normalizeAmount,
  validateAmount,
} from './AmountFieldUtils';
import { OnChange } from 'modules/form/utils/OnChange';

export interface AmountFieldProps<T> {
  change?: (name: T, value: string) => void;
  className?: string;
  currency: string;
  isDisabled?: boolean;
  isUSD?: boolean;
  maxDecimals?: number;
  maxLength?: number;
  name: T;
  size?: 'm' | 'l';
  validate?: (value: string, allValues?: any) => string | undefined;
}

export function AmountField<T extends string>({
  change,
  className,
  currency,
  isDisabled,
  isUSD,
  maxDecimals = MAX_DECIMALS,
  maxLength = MAX_LENGTH,
  name,
  size = 'm',
  validate = validateAmount,
}: AmountFieldProps<T>) {
  const { pristine } = useFormState();

  const { classes, cx } = useAmountFieldStyles({ isUSD, pristine, size });

  return (
    <FormGroup className={cx(classes.formGroup, className)}>
      <Field
        component={InputField}
        name={name}
        variant="outlined"
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={validate}
        parse={value => normalizeAmount(value, maxDecimals)}
        isHelperTextVisible
        disabled={isDisabled}
        InputProps={{
          classes: {
            root: classes.inputBase,
            input: classes.input,
            disabled: classes.disabled,
          },
          endAdornment: (
            <Typography variant="subtitle1" className={classes.subtitle}>
              {currency}
            </Typography>
          ),
        }}
        // eslint-disable-next-line
        inputProps={{ maxLength }}
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
}
