import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';

interface IUseUnclaimed {
  isLoading: boolean;
  token: TEthToken;
  amount: string;
  isShowed: boolean;
}

export const useUnclaimed = (): IUseUnclaimed => {
  const { data: claimableData, loading: isLoading } = useQuery({
    type: getClaimableData,
  });

  const amount = useMemo(() => {
    if (!claimableData) {
      return ZERO;
    }

    return claimableData.claimableAETHC;
  }, [claimableData]);

  return {
    isLoading,
    token: Token.aETHc,
    amount: `+ ${amount.toFormat()}`,
    isShowed: !amount.isZero(),
  };
};
