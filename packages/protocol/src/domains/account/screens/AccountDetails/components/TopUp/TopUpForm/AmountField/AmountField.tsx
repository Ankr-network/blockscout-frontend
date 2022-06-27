import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { Field, useForm } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'modules/form/components/InputField';
import { useStyles } from './AmountFieldStyles';
import {
  CURRENCY,
  MAX_DECIMALS,
  normalizeAmount,
  validateAmount,
} from './AmountFieldUtils';
import { OnChange } from 'modules/form/utils/OnChange';
import { AmountInputField } from '../TopUpFormTypes';

interface AmountFieldProps {
  name: AmountInputField.amount;
  isDisabled?: boolean;
  size?: 'm' | 'l';
  validate?: (value: string) => string | undefined;
  change?: (name: AmountInputField.amount, value: string) => void;
  maxDecimals?: number;
}

export const AmountField = ({
  size = 'm',
  name,
  isDisabled,
  change,
  validate = validateAmount,
  maxDecimals = MAX_DECIMALS,
}: AmountFieldProps) => {
  const classes = useStyles({ size });
  const form = useForm();

  return (
    <FormGroup className={classes.formGroup}>
      <Field
        component={InputField}
        type="number"
        name={name}
        variant="outlined"
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={value => form.getState()?.touched?.[name] && validate(value)}
        parse={value => normalizeAmount(value, maxDecimals)}
        isHelperTextVisible
        disabled={isDisabled}
        InputProps={{
          classes: {
            root: classes.inputBase,
            input: classes.input,
          },
          endAdornment: <Typography variant="subtitle1">{CURRENCY}</Typography>,
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
