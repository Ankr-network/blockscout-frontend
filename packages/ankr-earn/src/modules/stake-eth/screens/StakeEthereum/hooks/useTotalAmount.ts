import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { calcTotalAmount } from 'modules/stake-eth/utils/calcTotalAmount';

interface IUseTotalAmount {
  tokenOut: TEthToken;
  totalAmount: BigNumber;
}

interface IUseTotalAmountProps {
  amount?: BigNumber;
  fee?: BigNumber;
  isInvalidAmount: boolean;
}

export const useTotalAmount = ({
  amount,
  fee,
  isInvalidAmount,
}: IUseTotalAmountProps): IUseTotalAmount => {
  const { data: commonData } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: claimableData } = useGetETHClaimableDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const totalAmount = useMemo(() => {
    if (isInvalidAmount || !commonData || !fee) {
      return ZERO;
    }

    const total = calcTotalAmount({
      selectedToken: Token.aETHc,
      stakeGasFee: fee,
      amount,
      ethBalance: commonData.ethBalance,
      aETHcRatio: commonData.aETHcRatio,
    });

    const claimableAmount = claimableData?.claimableAETHC;

    return total.plus(claimableAmount ?? ZERO);
  }, [isInvalidAmount, commonData, fee, amount, claimableData?.claimableAETHC]);

  return {
    tokenOut: Token.aETHc,
    totalAmount,
  };
};
