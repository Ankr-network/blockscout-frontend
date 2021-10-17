import React from 'react';
import { Deposit } from './components/Deposit';
import { useAuth } from '../../../../modules/auth/hooks/useAuth';
import { ProBlock } from './components/ProBlock';
import { DepositSuccess } from './components/DepositSuccess';

export const Plan = () => {
  const { credentials, justDeposited, handleDeposit } = useAuth();

  if (credentials && justDeposited) {
    return <DepositSuccess />;
  }

  if (credentials) {
    return <ProBlock />;
  }

  return <Deposit onSubmit={handleDeposit} />;
};
