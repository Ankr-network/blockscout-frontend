import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from 'provider';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { RoutesConfig } from 'modules/stake-eth/Routes';

interface IUseUnclaimedEth {
  isShowed: boolean;
  isLoading: boolean;
  token: Token;
  claimLink: string;
  chainId: EEthereumNetworkId;
  amount?: BigNumber;
}

export const useUnclaimedEth = (): IUseUnclaimedEth => {
  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const isZero = !data || data.claimableAETHB.isZero();
  const isShowed = !isZero || loading;

  return {
    chainId: ETH_NETWORK_BY_ENV,
    amount: data?.claimableAETHB,
    isShowed,
    isLoading: loading,
    token: Token.ETH,
    claimLink: RoutesConfig.claim.generatePath(),
  };
};
