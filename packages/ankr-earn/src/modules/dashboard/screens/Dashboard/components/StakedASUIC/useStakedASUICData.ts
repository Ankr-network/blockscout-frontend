import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/stake-sui/Routes';

const token = Token.aSUIc;

export interface IStakedASUICData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const useStakedASUICData = (): IStakedASUICData => {
  const { suiConfig } = configFromEnv();

  return {
    amount: ZERO.plus(1),
    chainId: 0,
    isLoading: false,
    isPendingUnstakeLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    nativeAmount: ZERO,
    network: ' ',
    pendingValue: ZERO,
    ratio: ZERO,
    stakeLink: RoutesConfig.stake.generatePath(),
    token,
    tokenAddress: suiConfig.aSUIcToken,
    unstakeLink: RoutesConfig.unstake.generatePath(),
    usdAmount: ZERO,
    onAddTokenToWallet: () => null,
  };
};
