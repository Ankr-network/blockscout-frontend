import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { TEthToken } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

import { useSelectedToken } from '../../hooks/useSelectedToken';

interface IUseUnclaimed {
  isLoading: boolean;
  token: TEthToken;
  amount: string;
  isShowed: boolean;
}

export const useUnclaimed = (): IUseUnclaimed => {
  const { selectedToken } = useSelectedToken();
  const { data: commonData, loading: isLoading } = useQuery({
    type: getCommonData,
  });

  const amount = useMemo(() => {
    if (!commonData) {
      return ZERO;
    }

    if (selectedToken === Token.aETHc) {
      return commonData.claimableAETHC;
    }

    return commonData.claimableAETHB;
  }, [commonData, selectedToken]);

  return {
    isLoading,
    token: selectedToken,
    amount: `+ ${amount.toFormat()}`,
    isShowed: !amount.isZero(),
  };
};
