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
import { AmountInputField } from '../TopUpFormTypes';
import { ANKR_CURRENCY, USD_CURRENCY } from '../../../const';

interface AmountFieldProps {
  name: AmountInputField.amount;
  isDisabled?: boolean;
  size?: 'm' | 'l';
  validate?: (value: string) => string | undefined;
  change?: (name: AmountInputField.amount, value: string) => void;
  maxDecimals?: number;
  currency: typeof ANKR_CURRENCY | typeof USD_CURRENCY;
}

export const AmountField = ({
  size = 'm',
  name,
  isDisabled,
  change,
  validate = validateAmount,
  maxDecimals = MAX_DECIMALS,
  currency,
}: AmountFieldProps) => {
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
};
