import { ThemeColors } from 'web3modal';
import { EthereumWeb3KeyProvider } from './providers/EthereumWeb3KeyProvider';
import { AvailableProviders } from './types';
import { Web3KeyProvider } from './Web3KeyProvider';

export class ProviderManager {
  private providers: Record<AvailableProviders, Web3KeyProvider | undefined> =
    {} as Record<AvailableProviders, Web3KeyProvider>;

  constructor(private web3ModalTheme: ThemeColors) {}

  public async getProvider(providerId: AvailableProviders) {
    const provider = this.providers[providerId];
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
      const newProvider = new EthereumWeb3KeyProvider({
        web3ModalTheme: this.web3ModalTheme,
      });
      await newProvider.inject();
      await newProvider.connect();
      this.providers[providerId] = newProvider;
      return newProvider;
    }

    throw new Error('It is not possible to get a provider');
  }

  public disconnect(providerId: AvailableProviders) {
    const provider = this.providers[providerId];

    if (provider) {
      provider.disconnect();
      delete this.providers[providerId];
    }
  }
}
