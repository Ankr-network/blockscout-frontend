import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { AmountField } from 'domains/account/screens/AccountDetails/components/TopUp/TopUpForm/AmountField';
import { LoadingButton } from 'uiKit/LoadingButton';
import { getButtonText } from '../WithdrawUtils';
import { useStyles } from './WithdrawFormStyles';
import { AmountInputField, WithdrawFormValues } from './WithdrawFormTypes';
import { MAX_DECIMALS, validate } from './WithdrawFormUtils';
import { WithdrawBalanceInfo } from './WithdrawBalanceInfo';
import { ANKR_CURRENCY } from 'domains/account/screens/AccountDetails/components/const';

interface WithdrawFormProps {
  onSubmit: (values: WithdrawFormValues) => void;
  ankrBalanceWithoutVouchers: BigNumber;
  voucherBalance: BigNumber;
  loading: boolean;
  step: WithdrawStep;
}

export const WithdrawForm = ({
  onSubmit,
  ankrBalanceWithoutVouchers,
  voucherBalance,
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
            validate={value => validate(value, ankrBalanceWithoutVouchers)}
            maxDecimals={MAX_DECIMALS}
            currency={ANKR_CURRENCY}
          />
          <WithdrawBalanceInfo
            ankrBalanceWithoutVouchers={ankrBalanceWithoutVouchers}
            voucherBalance={voucherBalance}
          />
          <LoadingButton
            className={classes.button}
            disabled={loading}
            onClick={handleSubmit}
            loading={loading}
          >
            {getButtonText(loading, step)}
          </LoadingButton>
        </form>
      );
    },
    [
      classes.root,
      classes.button,
      ankrBalanceWithoutVouchers,
      loading,
      step,
      voucherBalance,
    ],
  );

  return <Form onSubmit={onSubmit} render={renderForm} />;
};
