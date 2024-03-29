import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { IFeeDetails } from 'modules/billing/types';
import { useANKRDepositFee } from 'domains/account/hooks/useANKRDepositFee';

export interface IUseEstimatedANKRDepositFeeDetailsParams {
  amount: number;
  price: string;
}

export const useEstimatedANKRDepositFeeDetails = ({
  amount,
  price,
}: IUseEstimatedANKRDepositFeeDetailsParams) => {
  const { fee, isLoading } = useANKRDepositFee({ amount });

  const depositFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { depositFeeDetails, isLoading };
};
