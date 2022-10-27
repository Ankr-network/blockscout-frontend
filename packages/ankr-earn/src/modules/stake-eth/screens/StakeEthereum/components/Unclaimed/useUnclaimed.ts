import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';

import { useSelectedToken } from '../../hooks/useSelectedToken';

interface IUseUnclaimed {
  isLoading: boolean;
  token: TEthToken;
  amount: string;
  isShowed: boolean;
}

export const useUnclaimed = (): IUseUnclaimed => {
  const { selectedToken } = useSelectedToken();
  const { data: claimableData, loading: isLoading } = useQuery({
    type: getClaimableData,
  });

  const amount = useMemo(() => {
    if (!claimableData) {
      return ZERO;
    }

    if (selectedToken === Token.aETHc) {
      return claimableData.claimableAETHC;
    }

    return claimableData.claimableAETHB;
  }, [claimableData, selectedToken]);

  return {
    isLoading,
    token: selectedToken,
    amount: `+ ${amount.toFormat()}`,
    isShowed: !amount.isZero(),
  };
};
