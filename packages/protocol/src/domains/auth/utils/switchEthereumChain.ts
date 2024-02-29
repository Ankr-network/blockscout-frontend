import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';

import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';
import { getProviderManager } from 'modules/api/getProviderManager';

export const switchEthereumChain = async () => {
  const provider =
    await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
      AvailableWriteProviders.ethCompatible,
    );

  const chainId = getExpectedChainId(API_ENV);

  await provider.switchNetwork(chainId);

  provider.currentChain = chainId;
};
