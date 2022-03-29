import { ThemeColors } from 'web3modal';
import {
  AvalancheHttpWeb3KeyProvider,
  BinanceHttpWeb3KeyProvider,
  EthereumHttpWeb3KeyProvider,
  EthereumWeb3KeyProvider,
} from './providers';
import { AvailableReadProviders, AvailableWriteProviders } from './types';
import { Web3KeyProvider } from './Web3KeyProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';
import { FantomHttpWeb3KeyProvider } from './providers/FantomHttpWeb3KeyProvider';
import { PolygonHttpWeb3KeyProvider } from './providers/PolygonHttpWeb3KeyProvider';

const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: 'https://rpc.ankr.com/eth',
  [AvailableReadProviders.ethGoerli]: 'https://eth-goerli-01.dccn.ankr.com',
  [AvailableReadProviders.avalancheChain]: 'https://rpc.ankr.com/avalanche',
  [AvailableReadProviders.avalancheChainTest]:
    'https://avax-fujitestnet-01.dccn.ankr.com/ext/bc/C/rpc',
  [AvailableReadProviders.binanceChain]: 'https://rpc.ankr.com/bsc',
  [AvailableReadProviders.binanceChainTest]:
    'https://data-seed-prebsc-2-s2.binance.org:8545',
  [AvailableReadProviders.ftmOpera]: 'https://rpc.ankr.com/fantom',
  [AvailableReadProviders.ftmTestnet]: 'https://rpc.testnet.fantom.network',
  [AvailableReadProviders.mumbai]: 'https://rpc-mumbai.matic.today',
  [AvailableReadProviders.polygon]: 'https://polygon-rpc.com',
};

interface IProviders {
  [AvailableWriteProviders.ethCompatible]: Web3KeyProvider;
  [AvailableWriteProviders.polkadot]: Web3KeyProvider;
  [AvailableWriteProviders.binance]: Web3KeyProvider;
  [AvailableReadProviders.ethMainnet]: Web3KeyReadProvider;
  [AvailableReadProviders.ethGoerli]: Web3KeyReadProvider;
  [AvailableReadProviders.avalancheChain]: Web3KeyReadProvider;
  [AvailableReadProviders.avalancheChainTest]: Web3KeyReadProvider;
  [AvailableReadProviders.binanceChain]: Web3KeyReadProvider;
  [AvailableReadProviders.binanceChainTest]: Web3KeyReadProvider;
  [AvailableReadProviders.ftmOpera]: Web3KeyReadProvider;
  [AvailableReadProviders.ftmTestnet]: Web3KeyReadProvider;
  [AvailableReadProviders.mumbai]: Web3KeyReadProvider;
}

export class ProviderManager {
  private providers: Partial<IProviders> = {};

  constructor(private web3ModalTheme: ThemeColors) {}

  public async getProvider(
    providerId: AvailableWriteProviders,
    walletId?: string,
  ) {
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
      await newProvider.inject(walletId);
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

      case AvailableReadProviders.mumbai:
      case AvailableReadProviders.polygon: {
        return new PolygonHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

      case AvailableReadProviders.avalancheChain:
      case AvailableReadProviders.avalancheChainTest: {
        return new AvalancheHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

      case AvailableReadProviders.binanceChain:
      case AvailableReadProviders.binanceChainTest: {
        return new BinanceHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

      case AvailableReadProviders.ftmOpera:
      case AvailableReadProviders.ftmTestnet: {
        return new FantomHttpWeb3KeyProvider(RPC_URLS[providerId]);
      }

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
