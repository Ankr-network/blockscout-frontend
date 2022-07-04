import React, { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import BigNumber from 'bignumber.js';

import { WithdrawFormValues, AmountInputField } from './WithdrawFormTypes';
import { AmountField } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/AmountField';
import { useStyles } from './WithdrawFormStyles';
import { MAX_DECIMALS, validate } from './WithdrawFormUtils';
import { LoadingButton } from 'domains/account/screens/TopUp/components/TopUpSteps/LoadingButton/LoadingButton';
import { getButtonText } from '../WithdrawUtils';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';

interface WithdrawFormProps {
  onSubmit: (values: WithdrawFormValues) => void;
  ankrBalance: BigNumber;
  loading: boolean;
  step: WithdrawStep;
}

export const WithdrawForm = ({
  onSubmit,
  ankrBalance,
  loading,
  step,
}: WithdrawFormProps) => {
  const classes = useStyles();

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<WithdrawFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.root}
        >
          <AmountField
            name={AmountInputField.amount}
            size="l"
            validate={value => validate(value, ankrBalance)}
            maxDecimals={MAX_DECIMALS}
          />
          <LoadingButton
            className={classes.button}
            isDisabled={loading}
            onClick={handleSubmit}
            loading={loading}
          >
            {getButtonText(loading, step)}
          </LoadingButton>
        </form>
      );
    },
    [classes.root, classes.button, ankrBalance, loading, step],
  );

  return <Form onSubmit={onSubmit} render={renderForm} />;
};
