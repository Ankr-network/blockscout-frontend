import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'modules/form/components/InputField';
import { useStyles } from './AmountFieldStyles';
import { CURRENCY, normalizeAmount, validateAmount } from './AmountFieldUtils';

interface AmountFieldProps {
  name: string;
  isDisabled?: boolean;
}

export const AmountField = ({ name, isDisabled }: AmountFieldProps) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.formGroup}>
      <Field
        component={InputField}
        type="number"
        name={name}
        variant="outlined"
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={validateAmount}
        parse={normalizeAmount}
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
    </FormGroup>
  );
};
