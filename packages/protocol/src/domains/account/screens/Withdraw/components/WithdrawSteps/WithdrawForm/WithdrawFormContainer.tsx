import React, { useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { WithdrawForm } from './WithdrawForm';
import { useBalance } from 'domains/account/hooks/useBalance';
import { WithdrawFormValues } from './WithdrawFormTypes';
import { useWithdraw } from 'domains/account/hooks/useWithdraw';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';

interface WithdrawFormProps {
  onClick: () => void;
  step: WithdrawStep;
}

export const WithdrawFormContainer = ({ onClick, step }: WithdrawFormProps) => {
  const { ankrBalance } = useBalance();

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
      ankrBalance={ankrBalance}
      loading={loading}
      step={step}
    />
  );
};
