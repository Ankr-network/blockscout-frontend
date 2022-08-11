import React, { useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { useBalance } from 'domains/account/hooks/useBalance';
import { useWithdraw } from 'domains/account/hooks/useWithdraw';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { WithdrawForm } from './WithdrawForm';
import { WithdrawFormValues } from './WithdrawFormTypes';

interface WithdrawFormProps {
  onClick: () => void;
  step: WithdrawStep;
}

export const WithdrawFormContainer = ({ onClick, step }: WithdrawFormProps) => {
  const { ankrBalanceWithoutVouchers, voucherBalance } = useBalance();

  const { handleSetAmount, loading } = useWithdraw();

  const onSubmit = useCallback(
    (values: WithdrawFormValues) => {
      handleSetAmount(new BigNumber(values.amount));

      onClick();
    },
    [onClick, handleSetAmount],
  );

  return (
    <WithdrawForm
      onSubmit={onSubmit}
      ankrBalanceWithoutVouchers={ankrBalanceWithoutVouchers}
      voucherBalance={voucherBalance}
      loading={loading}
      step={step}
    />
  );
};
