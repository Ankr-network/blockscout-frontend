import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'modules/form/components/InputField';
import { useStyles } from './AmountFieldStyles';
import {
  MAX_DECIMALS,
  normalizeAmount,
  validateAmount,
} from './AmountFieldUtils';
import { OnChange } from 'modules/form/utils/OnChange';
import { CurrencyType } from '../../../const';

interface AmountFieldProps<T> {
  name: T;
  isDisabled?: boolean;
  size?: 'm' | 'l';
  validate?: (value: string, allValues?: any) => string | undefined;
  change?: (name: T, value: string) => void;
  maxDecimals?: number;
  currency: CurrencyType;
}

export function AmountField<T extends string>({
  size = 'm',
  name,
  isDisabled,
  change,
  validate = validateAmount,
  maxDecimals = MAX_DECIMALS,
  currency,
}: AmountFieldProps<T>) {
  const classes = useStyles({ size });

  return (
    <FormGroup className={classes.formGroup}>
      <Field
        component={InputField}
        type="number"
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
          },
          endAdornment: <Typography variant="subtitle1">{currency}</Typography>,
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
}
