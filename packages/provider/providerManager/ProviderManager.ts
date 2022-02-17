import { ThemeColors } from 'web3modal';
import { EthereumWeb3KeyProvider } from './providers/EthereumWeb3KeyProvider';
import { AvailableReadProviders, AvailableWriteProviders } from './types';
import { Web3KeyProvider } from './Web3KeyProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';
import { EthereumHttpWeb3KeyProvider } from './providers/EthereumHttpWeb3KeyProvider';
import { BinanceHttpWeb3KeyProvider } from './providers/BinanceHttpWeb3KeyProvider';

const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: 'https://staging.multi-rpc.com/eth',
  [AvailableReadProviders.ethGoerli]: 'https://eth-goerli-01.dccn.ankr.com',
  [AvailableReadProviders.binanceChain]: 'https://rpc.ankr.com/bsc',
  [AvailableReadProviders.binanceChainTest]:
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
  [AvailableReadProviders.ftmOpera]: 'https://rpc.ankr.com/fantom',
  [AvailableReadProviders.ftmTestnet]: 'https://rpc.testnet.fantom.network',
};

interface IProviders {
  [AvailableWriteProviders.ethCompatible]: Web3KeyProvider;
  [AvailableWriteProviders.polkadot]: Web3KeyProvider;
  [AvailableWriteProviders.binance]: Web3KeyProvider;
  [AvailableReadProviders.ethMainnet]: Web3KeyReadProvider;
  [AvailableReadProviders.binanceChain]: Web3KeyReadProvider;
  [AvailableReadProviders.ftmOpera]: Web3KeyReadProvider;
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
      case AvailableReadProviders.ethMainnet:
      case AvailableReadProviders.ethGoerli: {
        return new EthereumHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

      case AvailableReadProviders.binanceChain:
      case AvailableReadProviders.binanceChainTest:
        return new BinanceHttpWeb3KeyProvider(RPC_URLS[providerId]);

      case AvailableReadProviders.ftmOpera:
      case AvailableReadProviders.ftmTestnet:
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
