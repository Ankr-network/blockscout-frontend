import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { EthereumWeb3KeyProvider } from '@ankr.com/provider';

export const switchEthereumChain = async () => {
  const provider = await ProviderManagerSingleton.getInstance().getProvider(
    AvailableWriteProviders.ethCompatible,
  );

  await (provider as EthereumWeb3KeyProvider).switchNetwork(
    getExpectedChainId(API_ENV),
  );
};
