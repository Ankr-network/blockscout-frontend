import { ThemeColors } from 'web3modal';
import { EthereumWeb3KeyProvider } from './providers/EthereumWeb3KeyProvider';
import { AvailableReadProviders, AvailableWriteProviders } from './types';
import { Web3KeyProvider } from './Web3KeyProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';
import { EthereumHttpWeb3KeyProvider } from './providers/EthereumHttpWeb3KeyProvider';

const ETHEREUM_MAINNET_RPC_URL = 'https://staging.multi-rpc.com/eth';
const ETHEREUM_GOERLI_RPC_URL = 'https://eth-goerli-01.dccn.ankr.com';

interface IProviders {
  [AvailableWriteProviders.ethCompatible]: Web3KeyProvider;
  [AvailableWriteProviders.polkadot]: Web3KeyProvider;
  [AvailableWriteProviders.binance]: Web3KeyProvider;
  [AvailableReadProviders.ethMainnetHttpProvider]: Web3KeyReadProvider;
}

export class ProviderManager {
  private providers: Partial<IProviders> = {};

  constructor(private web3ModalTheme: ThemeColors) {}

  public async getProvider(providerId: AvailableWriteProviders) {
    const provider = this.providers[providerId];
    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    if (providerId === AvailableWriteProviders.ethCompatible) {
      const newProvider = new EthereumWeb3KeyProvider({
        web3ModalTheme: this.web3ModalTheme,
      });
      await newProvider.inject();
      await newProvider.connect();
      this.providers[providerId] = newProvider;
      return newProvider;
    }

    throw new Error(`The provider isn't supported: ${providerId}`);
  }

  public async getReadProvider(providerId: AvailableReadProviders) {
    const provider = this.providers[providerId];
    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    if (providerId === AvailableReadProviders.ethMainnetHttpProvider) {
      return new EthereumHttpWeb3KeyProvider(ETHEREUM_MAINNET_RPC_URL);
    }

    if (providerId === AvailableReadProviders.ethGoerliHttpProvider) {
      return new EthereumHttpWeb3KeyProvider(ETHEREUM_GOERLI_RPC_URL);
    }

    throw new Error(`The provider isn't supported: ${providerId}`);
  }

  public disconnect(providerId: AvailableWriteProviders) {
    const provider = this.providers[providerId];

    if (provider) {
      provider.disconnect();
      delete this.providers[providerId];
    }
  }
}
