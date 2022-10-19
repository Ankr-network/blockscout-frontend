import {
  EEthereumNetworkId,
  Web3KeyWriteProvider,
} from '@ankr.com/provider-core';

import {
  configFromEnv,
  currentEnv,
  Env,
  ETH_DECIMALS,
  ZERO_ADDRESS,
} from '../../common';
import { ESSVTokens, ICommonProps } from '../types';

interface IAddTokenToWalletProps extends ICommonProps<Web3KeyWriteProvider> {
  token: ESSVTokens;
}

export const addTokenToWallet = async ({
  env = currentEnv,
  provider,
  token,
}: IAddTokenToWalletProps): Promise<boolean> => {
  const { contractConfig } = configFromEnv(env);

  const address =
    token === ESSVTokens.asETHc ? contractConfig.asETHcContract : ZERO_ADDRESS;

  const chainId =
    env === Env.Production
      ? EEthereumNetworkId.mainnet
      : EEthereumNetworkId.goerli;

  return provider.addTokenToWallet({
    address,
    chainId,
    decimals: ETH_DECIMALS,
    symbol: token,
  });
};
