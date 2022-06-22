import React, { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button } from '@material-ui/core';

import { WithdrawFormValues, AmountInputField } from './WithdrawFormTypes';
import { AmountField } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/AmountField';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './WithdrawFormStyles';

interface WithdrawFormProps {
  onClick?: () => void;
}

export const WithdrawForm = ({ onClick }: WithdrawFormProps) => {
  const classes = useStyles();

  const onSubmit = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick();
    }
  }, [onClick]);

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<WithdrawFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.root}
        >
          <AmountField name={AmountInputField.amount} />
          <Button fullWidth onClick={handleSubmit} className={classes.button}>
            {t('withdraw-steps.next')}
          </Button>
        </form>
      );
    },
    [classes.root, classes.button],
  );

  return <Form onSubmit={onSubmit} render={renderForm} />;
};
