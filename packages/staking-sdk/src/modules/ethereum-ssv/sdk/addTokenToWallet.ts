import {
  EEthereumNetworkId,
  Web3KeyWriteProvider,
} from '@ankr.com/provider-core';

import {
  configFromEnv,
  currentEnv,
  ETH_DECIMALS,
  ICommonProps,
  isMainnet,
  ZERO_ADDRESS,
} from '../../common';
import { ESSVTokens } from '../types';

type TChainId = EEthereumNetworkId.mainnet | EEthereumNetworkId.goerli;

interface IAddTokenToWalletProps extends ICommonProps<Web3KeyWriteProvider> {
  chainId?: TChainId;
  token: ESSVTokens;
}

export const addTokenToWallet = async ({
  chainId = isMainnet ? EEthereumNetworkId.mainnet : EEthereumNetworkId.goerli,
  env = currentEnv,
  provider,
  token,
}: IAddTokenToWalletProps): Promise<boolean> => {
  const { contractConfig } = configFromEnv(env);

  const address =
    token === ESSVTokens.asETHc ? contractConfig.asETHcContract : ZERO_ADDRESS;

  return provider.addTokenToWallet({
    address,
    chainId,
    decimals: ETH_DECIMALS,
    symbol: token,
  });
};
