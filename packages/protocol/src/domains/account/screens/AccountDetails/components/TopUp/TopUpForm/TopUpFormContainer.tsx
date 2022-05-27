import React, { useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { TopUpForm } from './TopUpForm';
import { TopUpFormValues } from './TopUpFormTypes';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export const TopUpFormContainer = () => {
  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));
    },
    [dispatch, handleSetAmount],
  );

  return <TopUpForm onSubmit={onSubmit} />;
};
