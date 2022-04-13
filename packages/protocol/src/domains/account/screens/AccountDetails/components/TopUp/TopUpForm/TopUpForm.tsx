import React, { useCallback } from 'react';
import { Button, FormGroup, Typography } from '@material-ui/core';
import { Form, FormRenderProps, Field } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'modules/form/components/InputField';
import { useStyles } from './TopUpFormStyles';
import {
  TopUpFormValues,
  TopUpFormFields,
  TopUpFormProps,
} from './TopUpFormTypes';
import { CURRENCY, normalizeAmount, validateAmount } from './TopUpFormUtils';

export const TopUpForm = ({ onSubmit }: TopUpFormProps) => {
  const classes = useStyles();

  const renderForm = useCallback(
    ({ handleSubmit, validating }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <FormGroup className={classes.formGroup}>
            <Field
              component={InputField}
              type="number"
              name={TopUpFormFields.amount}
              variant="outlined"
              placeholder={t('account.account-details.top-up.placeholder')}
              validate={validateAmount}
              parse={normalizeAmount}
              isHelperTextVisible
              InputProps={{
                classes: {
                  root: classes.inputBase,
                  input: classes.input,
                },
                endAdornment: (
                  <Typography variant="subtitle1">{CURRENCY}</Typography>
                ),
              }}
            />
          </FormGroup>
          <Button
            color="primary"
            fullWidth
            type="submit"
            disabled={validating}
            className={classes.button}
          >
            {t('account.account-details.top-up.button')}
          </Button>
        </form>
      );
    },
    [
      classes.button,
      classes.inputBase,
      classes.input,
      classes.form,
      classes.formGroup,
    ],
  );

  return <Form onSubmit={onSubmit} render={renderForm} />;
};
