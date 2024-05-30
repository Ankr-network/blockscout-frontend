import { useCallback, useMemo } from 'react';

import { ECurrency, ICryptoTransaction } from '../types';
import { useSendAllowanceAnkrMutation } from '../actions/sendAllowanceAnkr';
import { useSendAllowanceUsdcMutation } from '../actions/sendAllowanceUsdc';
import { useSendAllowanceUsdtMutation } from '../actions/sendAllowanceUsdt';

export interface IUseSendAllowanceProps {
  tx: ICryptoTransaction;
}

export const useSendAllowance = ({ tx }: IUseSendAllowanceProps) => {
  const { currency, id: txId, isApproving: isAllowanceSending } = tx;

  const [sendAnkrAllowance] = useSendAllowanceAnkrMutation();
  const [sendUsdcAllowance] = useSendAllowanceUsdcMutation();
  const [sendUsdtAllowance] = useSendAllowanceUsdtMutation();

  const sendAllowance = useMemo(() => {
    if (currency === ECurrency.USDC) {
      return sendUsdcAllowance;
    }

    if (currency === ECurrency.USDT) {
      return sendUsdtAllowance;
    }

    return sendAnkrAllowance;
  }, [currency, sendAnkrAllowance, sendUsdcAllowance, sendUsdtAllowance]);

  const handleSendAllowance = useCallback(
    () => sendAllowance({ txId }),
    [sendAllowance, txId],
  );

  return { handleSendAllowance, isAllowanceSending };
};
