import { EEthereumNetworkId, Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  configFromEnv,
  currentEnv,
  ICommonProps,
  isMainnet,
} from '../../common';
import { XDC_DECIMALS } from '../const';
import { EXDCTokens } from '../types';

interface IAddTokenToWalletProps extends ICommonProps<Web3KeyWriteProvider> {
  chainId?: EEthereumNetworkId.xdc | EEthereumNetworkId.xdcTestnet;
}

export const addTokenToWallet = async ({
  chainId = isMainnet ? EEthereumNetworkId.xdc : EEthereumNetworkId.xdcTestnet,
  env = currentEnv,
  provider,
}: IAddTokenToWalletProps): Promise<boolean> => {
  const { xdcConfig } = configFromEnv(env);

  return provider.addTokenToWallet({
    address: xdcConfig.ankrXDCToken,
    chainId,
    decimals: XDC_DECIMALS,
    symbol: EXDCTokens.ankrXDC,
  });
};
