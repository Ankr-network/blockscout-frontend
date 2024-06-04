import { useCallback, useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { ECurrency, ICryptoTransaction } from '../types';
import { useDepositAnkrForUserMutation } from '../actions/depositAnkrForUser';
import { useDepositAnkrMutation } from '../actions/depositAnkr';
import { useDepositUsdcForUserMutation } from '../actions/depositUsdcForUser';
import { useDepositUsdcMutation } from '../actions/depositUsdc';
import { useDepositUsdtForUserMutation } from '../actions/depositUsdtForUser';
import { useDepositUsdtMutation } from '../actions/depositUsdt';

export interface IUseDepositProps {
  tx: ICryptoTransaction;
}

export const useDeposit = ({ tx }: IUseDepositProps) => {
  const { currency, id: txId, isDepositing } = tx;

  const [depositAnkr, { reset: resetDepositAnkr }] = useDepositAnkrMutation();
  const [depositAnkrForUser, { reset: resetDepositAnkrForUser }] =
    useDepositAnkrForUserMutation();

  const [depositUsdc, { reset: resetDepositUsdc }] = useDepositUsdcMutation();
  const [depositUsdcForUser, { reset: resetDepositUsdcForUser }] =
    useDepositUsdcForUserMutation();

  const [depositUsdt, { reset: resetDepositUsdt }] = useDepositUsdtMutation();
  const [depositUsdtForUser, { reset: resetDepositUsdtForUser }] =
    useDepositUsdtForUserMutation();

  const [deposit, depositForUser, resetDeposit, resetDepositForUser] =
    useMemo(() => {
      if (currency === ECurrency.USDC) {
        return [
          depositUsdc,
          depositUsdcForUser,
          resetDepositUsdc,
          resetDepositUsdcForUser,
        ] as const;
      }

      if (currency === ECurrency.USDT) {
        return [
          depositUsdt,
          depositUsdtForUser,
          resetDepositUsdt,
          resetDepositUsdtForUser,
        ] as const;
      }

      return [
        depositAnkr,
        depositAnkrForUser,
        resetDepositAnkr,
        resetDepositAnkrForUser,
      ] as const;
    }, [
      currency,
      depositAnkr,
      depositAnkrForUser,
      depositUsdc,
      depositUsdcForUser,
      depositUsdt,
      depositUsdtForUser,
      resetDepositAnkr,
      resetDepositAnkrForUser,
      resetDepositUsdc,
      resetDepositUsdcForUser,
      resetDepositUsdt,
      resetDepositUsdtForUser,
    ]);

  const { selectedGroupAddress } = useSelectedUserGroup();

  const handleResetDeposit = selectedGroupAddress
    ? resetDepositForUser
    : resetDeposit;

  const handleDeposit = useCallback(() => {
    if (selectedGroupAddress) {
      return depositForUser({ txId });
    }

    return deposit({ txId });
  }, [deposit, depositForUser, selectedGroupAddress, txId]);

  return { handleDeposit, handleResetDeposit, isDepositing };
};
