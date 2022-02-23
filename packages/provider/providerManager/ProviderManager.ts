import { ThemeColors } from 'web3modal';
import { EthereumWeb3KeyProvider } from './providers/EthereumWeb3KeyProvider';
import { AvailableReadProviders, AvailableWriteProviders } from './types';
import { Web3KeyProvider } from './Web3KeyProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';
import { EthereumHttpWeb3KeyProvider } from './providers/EthereumHttpWeb3KeyProvider';
import { BinanceHttpWeb3KeyProvider } from './providers/BinanceHttpWeb3KeyProvider';

const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnetHttpProvider]: 'https://rpc.ankr.com/eth',
  [AvailableReadProviders.ethGoerliHttpProvider]:
    'https://eth-goerli-01.dccn.ankr.com',
  [AvailableReadProviders.binanceChain]: 'https://rpc.ankr.com/bsc',
  [AvailableReadProviders.binanceChainTest]:
    'https://data-seed-prebsc-2-s2.binance.org:8545',
  [AvailableReadProviders.ftmOperaHttpProvider]: 'https://rpc.ankr.com/fantom',
  [AvailableReadProviders.ftmTestnetHttpProvider]:
    'https://rpc.testnet.fantom.network',
};

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

    switch (providerId) {
      case AvailableReadProviders.ethMainnetHttpProvider:
      case AvailableReadProviders.ethGoerliHttpProvider: {
        return new EthereumHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

      case AvailableReadProviders.binanceChain:
      case AvailableReadProviders.binanceChainTest:
        return new BinanceHttpWeb3KeyProvider(RPC_URLS[providerId]);

      case AvailableReadProviders.ftmOperaHttpProvider:
      case AvailableReadProviders.ftmTestnetHttpProvider:
        return new EthereumHttpWeb3KeyProvider(RPC_URLS[providerId]);

      default: {
        throw new Error(`The provider isn't supported: ${providerId}`);
      }
    }
  }

  public disconnect(providerId: AvailableWriteProviders) {
    const provider = this.providers[providerId];

    if (provider) {
      provider.disconnect();
      delete this.providers[providerId];
    }
  }
}
