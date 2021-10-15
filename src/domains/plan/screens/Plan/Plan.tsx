import React, { useCallback } from 'react';
import { Deposit } from './components/Deposit';
import { useAuth } from '../../../../modules/auth/hooks/useAuth';
import { ProBlock } from './components/ProBlock';
import { useDispatchRequest } from '@redux-requests/react';
import { deposit } from '../../../../modules/auth/actions/deposit';
import BigNumber from 'bignumber.js';
import { DepositSuccess } from './components/DepositSuccess';

const DEFAULT_DEPOSIT = new BigNumber(10_000);

export const Plan = () => {
  const { hasAccount, justDeposited } = useAuth();
  const dispatchRequest = useDispatchRequest();

  const handleSubmit = useCallback(() => {
    dispatchRequest(deposit(DEFAULT_DEPOSIT));
  }, [dispatchRequest]);

  if (hasAccount && justDeposited) {
    return <DepositSuccess />;
  }

  if (hasAccount) {
    return <ProBlock />;
  }

  return <Deposit onSubmit={handleSubmit} />;
};
