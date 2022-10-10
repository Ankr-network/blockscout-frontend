import { useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { TopUpForm } from './TopUpForm';
import { TopUpFormValues } from './TopUpFormTypes';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useCheckLoginStep, useCheckBrokenTransaction } from './TopUpFormUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const TopUpFormContainer = () => {
  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  useCheckBrokenTransaction();

  const { handleCheckLockedFunds, hasLoginStep } = useCheckLoginStep();

  useOnMount(() => {
    handleCheckLockedFunds();
  });

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));
    },
    [dispatch, handleSetAmount],
  );

  return <TopUpForm onSubmit={onSubmit} hasLoginStep={hasLoginStep} />;
};
