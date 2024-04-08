import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { IFeeDetails } from 'modules/billing/types';
import { useAnkrAllowanceFee } from 'domains/account/hooks/useANKRAllowanceFee';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';

export interface IUseEstimatedANKRAllowanceFeeDetailsProps {
  amount: number;
  price: string;
}

export const useEstimatedANKRAllowanceFeeDetails = ({
  amount,
  price,
}: IUseEstimatedANKRAllowanceFeeDetailsProps) => {
  const { hasWeb3Service } = useHasWeb3Service();

  const { fee, isLoading } = useAnkrAllowanceFee({
    amount,
    skipFetching: !hasWeb3Service,
  });

  const approvalFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { approvalFeeDetails, isLoading };
};
