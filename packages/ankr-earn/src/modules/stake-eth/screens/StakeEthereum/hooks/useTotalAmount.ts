import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { TEthToken } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { calcTotalAmount } from 'modules/stake-eth/utils/calcTotalAmount';

import { useSelectedToken } from './useSelectedToken';

interface IUseTotalAmount {
  isFeeLoading: boolean;
  tokenOut: TEthToken;
  totalAmount: BigNumber;
}

export const useTotalAmount = (amount?: BigNumber): IUseTotalAmount => {
  const { selectedToken } = useSelectedToken();

  const { loading: isFeeLoading, data: stakeGasFee } = useQuery({
    type: getStakeGasFee,
  });

  const { data: commonData } = useQuery({
    type: getCommonData,
  });

  const totalAmount = useMemo(() => {
    if (!commonData || !stakeGasFee) {
      return ZERO;
    }

    const total = calcTotalAmount({
      selectedToken,
      stakeGasFee,
      amount,
      ethBalance: commonData.ethBalance,
      aETHcRatio: commonData.aETHcRatio,
    });

    const claimableAmount =
      selectedToken === Token.aETHb
        ? commonData.claimableAETHB
        : commonData.claimableAETHC;

    return total.plus(claimableAmount);
  }, [amount, commonData, selectedToken, stakeGasFee]);

  return {
    isFeeLoading,
    tokenOut: selectedToken,
    totalAmount,
  };
};
