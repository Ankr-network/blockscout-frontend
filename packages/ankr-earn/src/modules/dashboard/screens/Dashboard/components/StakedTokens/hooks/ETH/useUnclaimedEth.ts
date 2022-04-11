import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { ETH_NETWORK_BY_ENV, featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { RoutesConfig } from 'modules/stake-eth/Routes';

interface IUseUnclaimedEth {
  isShowed: boolean;
  isLoading: boolean;
  token: Token;
  claimLink: string;
  chainId: BlockchainNetworkId;
  amount?: BigNumber;
}

export const useUnclaimedEth = (): IUseUnclaimedEth => {
  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const isShowed = !data?.claimableAETHB.isZero() || loading;

  return {
    chainId: ETH_NETWORK_BY_ENV,
    amount: data?.claimableAETHB,
    isShowed: featuresConfig.stakeETH && isShowed,
    isLoading: loading,
    token: Token.ETH,
    // todo: add actual claimLink
    claimLink: RoutesConfig.root,
  };
};
