import { configFromEnv, PolkadotProvider } from 'polkadot';
import { IProviderOptions, ThemeColors } from 'web3modal';
import {
  AvalancheHttpWeb3KeyProvider,
  BinanceHttpWeb3KeyProvider,
  EthereumHttpWeb3KeyProvider,
  EthereumWeb3KeyProvider,
} from './providers';
import { FantomHttpWeb3KeyProvider } from './providers/FantomHttpWeb3KeyProvider';
import { PolygonHttpWeb3KeyProvider } from './providers/PolygonHttpWeb3KeyProvider';
import { AvailableReadProviders, AvailableWriteProviders } from './types';
import { sleep } from './utils/sleep';
import { Web3KeyWriteProvider } from './Web3KeyWriteProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';

const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: 'https://rpc.ankr.com/eth',
  [AvailableReadProviders.ethGoerli]: 'https://rpc.ankr.com/eth_goerli',
  [AvailableReadProviders.avalancheChain]: 'https://rpc.ankr.com/avalanche',
  [AvailableReadProviders.avalancheChainTest]:
    'https://avax-fujitestnet-01.dccn.ankr.com/ext/bc/C/rpc',
  [AvailableReadProviders.binanceChain]: 'https://rpc.ankr.com/bsc',
  [AvailableReadProviders.binanceChainTest]:
    'https://data-seed-prebsc-2-s2.binance.org:8545',
  [AvailableReadProviders.ftmOpera]: 'https://rpc.ankr.com/fantom',
  [AvailableReadProviders.ftmTestnet]: 'https://rpc.testnet.fantom.network',
  [AvailableReadProviders.mumbai]: 'https://matic-mumbai.chainstacklabs.com',
  [AvailableReadProviders.polygon]: 'https://polygon-rpc.com',
};

interface IProviders {
  [AvailableWriteProviders.ethCompatible]: Web3KeyWriteProvider;
  [AvailableWriteProviders.polkadotCompatible]: PolkadotProvider;
  [AvailableReadProviders.ethMainnet]: Web3KeyReadProvider;
  [AvailableReadProviders.ethGoerli]: Web3KeyReadProvider;
  [AvailableReadProviders.avalancheChain]: Web3KeyReadProvider;
  [AvailableReadProviders.avalancheChainTest]: Web3KeyReadProvider;
  [AvailableReadProviders.binanceChain]: Web3KeyReadProvider;
  [AvailableReadProviders.binanceChainTest]: Web3KeyReadProvider;
  [AvailableReadProviders.ftmOpera]: Web3KeyReadProvider;
  [AvailableReadProviders.ftmTestnet]: Web3KeyReadProvider;
  [AvailableReadProviders.mumbai]: Web3KeyReadProvider;
  [AvailableReadProviders.polygon]: Web3KeyReadProvider;
}

const POLKADOT_CONNECT_WAIT_MS = 250;

export class ProviderManager {
  private providers: Partial<IProviders> = {};

  constructor(
    private web3ModalTheme: ThemeColors,
    private providerOptions?: IProviderOptions,
  ) {}

  async getProvider(providerId: AvailableWriteProviders, walletId?: string) {
    const provider = this.providers[providerId];

    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    switch (providerId) {
      case AvailableWriteProviders.ethCompatible:
        return this.getETHWriteProvider(walletId);

      case AvailableWriteProviders.polkadotCompatible:
        return this.getPolkadotWriteProvider();

      default:
        throw new Error(`The provider isn't supported: ${providerId}`);
    }
  }

  async getETHReadProvider(providerId: AvailableReadProviders) {
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

  async getETHWriteProvider(walletId?: string) {
    const providerId = AvailableWriteProviders.ethCompatible;
    const provider = this.providers[providerId];

    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    const newProvider = new EthereumWeb3KeyProvider({
      web3ModalTheme: this.web3ModalTheme,
    });

    await newProvider.inject(walletId, this.providerOptions);
    await newProvider.connect();

    this.providers[providerId] = newProvider;

    return newProvider;
  }

  async getPolkadotWriteProvider() {
    const providerId = AvailableWriteProviders.polkadotCompatible;
    const provider = this.providers[providerId];

    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    const { networkType, polkadotUrl } = configFromEnv();

    const newProvider = new PolkadotProvider({
      networkType,
      polkadotUrl,
    });

    // Note: This is for "resolving" issues with extension loading after the page refresh (production mode)
    await sleep(POLKADOT_CONNECT_WAIT_MS);

    await newProvider.connect();

    this.providers[providerId] = newProvider;

    return newProvider;
  }

  getWriteProviderById(
    providerId: AvailableWriteProviders,
  ): Web3KeyWriteProvider | PolkadotProvider | null {
    return this.providers[providerId] ?? null;
  }

  disconnect(providerId: AvailableWriteProviders) {
    const provider = this.providers[providerId];

    if (provider) {
      provider.disconnect();
      delete this.providers[providerId];
    }
  }
}
