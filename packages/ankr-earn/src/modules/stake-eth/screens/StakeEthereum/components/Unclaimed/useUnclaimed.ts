import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';

interface IUseUnclaimed {
  isLoading: boolean;
  token: TEthToken;
  amount: string;
  isShowed: boolean;
}

export const useUnclaimed = (): IUseUnclaimed => {
  const { data: claimableData, isFetching: isLoading } =
    useGetETHClaimableDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
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
