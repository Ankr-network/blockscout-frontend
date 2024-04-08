import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { IFeeDetails } from 'modules/billing/types';
import { useANKRDepositFee } from 'domains/account/hooks/useANKRDepositFee';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';

export interface IUseEstimatedANKRDepositFeeDetailsParams {
  amount: number;
  price: string;
}

export const useEstimatedANKRDepositFeeDetails = ({
  amount,
  price,
}: IUseEstimatedANKRDepositFeeDetailsParams) => {
  const { hasWeb3Service } = useHasWeb3Service();

  const { fee, isLoading } = useANKRDepositFee({
    amount,
    skipFetching: !hasWeb3Service,
  });

  const depositFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { depositFeeDetails, isLoading };
};
