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

  const [depositAnkr] = useDepositAnkrMutation();
  const [depositAnkrForUser] = useDepositAnkrForUserMutation();

  const [depositUsdc] = useDepositUsdcMutation();
  const [depositUsdcForUser] = useDepositUsdcForUserMutation();

  const [depositUsdt] = useDepositUsdtMutation();
  const [depositUsdtForUser] = useDepositUsdtForUserMutation();

  const [deposit, depositForUser] = useMemo(() => {
    if (currency === ECurrency.USDC) {
      return [depositUsdc, depositUsdcForUser] as const;
    }

    if (currency === ECurrency.USDT) {
      return [depositUsdt, depositUsdtForUser] as const;
    }

    return [depositAnkr, depositAnkrForUser] as const;
  }, [
    currency,
    depositAnkr,
    depositAnkrForUser,
    depositUsdc,
    depositUsdcForUser,
    depositUsdt,
    depositUsdtForUser,
  ]);

  const { selectedGroupAddress } = useSelectedUserGroup();

  const handleDeposit = useCallback(() => {
    if (selectedGroupAddress) {
      return depositForUser({ txId });
    }

    return deposit({ txId });
  }, [deposit, depositForUser, selectedGroupAddress, txId]);

  return { handleDeposit, isDepositing };
};
