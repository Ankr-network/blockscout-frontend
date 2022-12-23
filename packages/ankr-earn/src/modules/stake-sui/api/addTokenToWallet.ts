import { EEthereumNetworkId, Web3KeyWriteProvider } from '@ankr.com/provider';
import { currentEnv, ICommonProps } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { ANKR_SUI_DECIMALS } from '../const';

export const addTokenToWallet = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyWriteProvider>): Promise<boolean> => {
  const { suiConfig } = configFromEnv(env);

  return provider.addTokenToWallet({
    address: suiConfig.ankrSUIToken,
    chainId: isMainnet ? EEthereumNetworkId.mainnet : EEthereumNetworkId.goerli,
    decimals: ANKR_SUI_DECIMALS,
    symbol: Token.ankrSUI,
  });
};
