import { EEthereumNetworkId, Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  configFromEnv,
  currentEnv,
  ICommonProps,
  isMainnet,
} from '../../common';
import { XDC_DECIMALS } from '../const';
import { EXDCTokens } from '../types';

export const addTokenToWallet = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyWriteProvider>): Promise<boolean> => {
  const { xdcConfig } = configFromEnv(env);

  return provider.addTokenToWallet({
    address: xdcConfig.ankrXDCToken,
    chainId: isMainnet ? EEthereumNetworkId.xdc : EEthereumNetworkId.xdcTestnet,
    decimals: XDC_DECIMALS,
    symbol: EXDCTokens.ankrXDC,
  });
};
