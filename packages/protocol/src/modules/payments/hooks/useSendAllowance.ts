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

  const [
    sendAnkrAllowance,
    { data: sendAllowanceResultAnkr, reset: resetAllowanceSendingAnkr },
  ] = useSendAllowanceAnkrMutation({ fixedCacheKey: txId });
  const [
    sendUsdcAllowance,
    { data: sendAllowanceResultUsdc, reset: resetAllowanceSendingUsdc },
  ] = useSendAllowanceUsdcMutation({ fixedCacheKey: txId });
  const [
    sendUsdtAllowance,
    { data: sendAllowanceResultUsdt, reset: resetAllowanceSendingUsdt },
  ] = useSendAllowanceUsdtMutation({ fixedCacheKey: txId });

  const isAllowanceSentAnkr = Boolean(sendAllowanceResultAnkr);
  const isAllowanceSentUsdc = Boolean(sendAllowanceResultUsdc);
  const isAllowanceSentUsdt = Boolean(sendAllowanceResultUsdt);

  const [sendAllowance, handleResetAllowanceSending, isAllowanceSent] =
    useMemo(() => {
      if (currency === ECurrency.USDC) {
        return [
          sendUsdcAllowance,
          resetAllowanceSendingUsdc,
          isAllowanceSentUsdc,
        ];
      }

      if (currency === ECurrency.USDT) {
        return [
          sendUsdtAllowance,
          resetAllowanceSendingUsdt,
          isAllowanceSentUsdt,
        ];
      }

      return [
        sendAnkrAllowance,
        resetAllowanceSendingAnkr,
        isAllowanceSentAnkr,
      ];
    }, [
      currency,
      isAllowanceSentAnkr,
      isAllowanceSentUsdc,
      isAllowanceSentUsdt,
      resetAllowanceSendingAnkr,
      resetAllowanceSendingUsdc,
      resetAllowanceSendingUsdt,
      sendAnkrAllowance,
      sendUsdcAllowance,
      sendUsdtAllowance,
    ]);

  const handleSendAllowance = useCallback(
    () => sendAllowance({ txId }),
    [sendAllowance, txId],
  );

  return {
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceSending,
    isAllowanceSent,
  };
};
