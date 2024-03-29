import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { IFeeDetails } from 'modules/billing/types';
import { useAnkrAllowanceFee } from 'domains/account/hooks/useANKRAllowanceFee';

export interface IUseEstimatedANKRAllowanceFeeDetailsProps {
  amount: number;
  price: string;
}

export const useEstimatedANKRAllowanceFeeDetails = ({
  amount,
  price,
}: IUseEstimatedANKRAllowanceFeeDetailsProps) => {
  const { fee, isLoading } = useAnkrAllowanceFee({ amount });

  const approvalFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { approvalFeeDetails, isLoading };
};
