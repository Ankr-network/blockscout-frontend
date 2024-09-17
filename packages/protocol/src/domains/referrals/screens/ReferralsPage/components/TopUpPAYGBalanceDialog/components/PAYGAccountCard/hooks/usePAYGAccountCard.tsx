import { useMemo } from 'react';

import { selectFullPAYGBalance } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { IPAYGAccountCardProps } from '../PAYGAccountCard';

export const usePAYGAccountCard = () => {
  const {
    balanceApiCredits: creditBalance,
    balanceInRequests: requestsBalance,
    balanceUsd: usdBalance,
  } = useAppSelector(selectFullPAYGBalance);

  const paygAccountCardProps = useMemo(
    (): IPAYGAccountCardProps => ({
      creditBalance,
      requestsBalance,
      usdBalance,
    }),
    [creditBalance, requestsBalance, usdBalance],
  );

  return { paygAccountCardProps };
};
