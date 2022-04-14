import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './TopUpFormStyles';
import {
  TopUpFormValues,
  TopUpFormFields,
  TopUpFormProps,
} from './TopUpFormTypes';
import { AmountField } from './AmountField/AmountField';

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
          <AmountField name={TopUpFormFields.amount} />
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
    [classes.button, classes.form],
  );

  return <Form onSubmit={onSubmit} render={renderForm} />;
};
