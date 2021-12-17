import { Web3KeyProvider } from '.';
import { EthereumWeb3KeyProvider } from './providers/EthereumWeb3KeyProvider';
import { AvailableProviders } from './types';

export class ProviderManager {
  private static providers: Record<
    AvailableProviders,
    Web3KeyProvider | undefined
  > = {} as Record<AvailableProviders, Web3KeyProvider>;

  public static async getProvider(providerId: AvailableProviders) {
    const provider = ProviderManager.providers[providerId];
    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    if (
      providerId === AvailableProviders.Mainnet ||
      providerId === AvailableProviders.Goerli
    ) {
      const newProvider = new EthereumWeb3KeyProvider();
      await newProvider.inject();
      await newProvider.connect();
      ProviderManager.providers[providerId] = newProvider;
      return newProvider;
    }

    throw new Error('It is not possible to get a provider');
  }

  public static disconnect(providerId: AvailableProviders) {
    const provider = ProviderManager.providers[providerId];

    if (provider) {
      provider.disconnect();
      delete ProviderManager.providers[providerId];
    }
  }
}
