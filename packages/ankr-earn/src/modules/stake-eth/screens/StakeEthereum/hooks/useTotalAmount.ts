import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { calcTotalAmount } from 'modules/stake-eth/utils/calcTotalAmount';

interface IUseTotalAmount {
  isFeeLoading: boolean;
  tokenOut: TEthToken;
  totalAmount: BigNumber;
}

export const useTotalAmount = (amount?: BigNumber): IUseTotalAmount => {
  const { loading: isFeeLoading, data: stakeGasFee } = useQuery({
    type: getStakeGasFee,
  });

  const { data: commonData } = useQuery({
    type: getCommonData,
  });
  const { data: claimableData } = useQuery({
    type: getClaimableData,
  });

  const totalAmount = useMemo(() => {
    if (!commonData || !stakeGasFee) {
      return ZERO;
    }

    const total = calcTotalAmount({
      selectedToken: Token.aETHc,
      stakeGasFee,
      amount,
      ethBalance: commonData.ethBalance,
      aETHcRatio: commonData.aETHcRatio,
    });

    const claimableAmount = claimableData?.claimableAETHC;

    return total.plus(claimableAmount ?? ZERO);
  }, [amount, commonData, claimableData, stakeGasFee]);

  return {
    isFeeLoading,
    tokenOut: Token.aETHc,
    totalAmount,
  };
};
