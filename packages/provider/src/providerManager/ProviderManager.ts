import { IProviderOptions, ThemeColors } from 'web3modal';
import {
  AvalancheHttpWeb3KeyProvider,
  BinanceHttpWeb3KeyProvider,
  EthereumHttpWeb3KeyProvider,
  EthereumWeb3KeyProvider,
  XDCHttpWeb3KeyProvider,
} from './providers';
import { FantomHttpWeb3KeyProvider } from './providers/FantomHttpWeb3KeyProvider';
import { GnosisHttpWeb3KeyProvider } from './providers/GnosisHttpWeb3KeyProvider';
import { PolygonHttpWeb3KeyProvider } from './providers/PolygonHttpWeb3KeyProvider';
import {
  AvailableReadProviders,
  AvailableWriteProviders,
  IProvider,
} from '../utils/types';
import { Web3KeyWriteProvider } from '../utils/Web3KeyWriteProvider';
import { Web3KeyReadProvider } from '../utils/Web3KeyReadProvider';

const RPC_URLS: Record<AvailableReadProviders, string> = {
  [AvailableReadProviders.ethMainnet]: 'https://rpc.ankr.com/eth',
  [AvailableReadProviders.ethGoerli]: 'https://rpc.ankr.com/eth_goerli',
  [AvailableReadProviders.avalancheChain]: 'https://rpc.ankr.com/avalanche',
  [AvailableReadProviders.avalancheChainTest]:
    'https://rpc.ankr.com/avalanche_fuji',
  [AvailableReadProviders.binanceChain]: 'https://rpc.ankr.com/bsc',
  [AvailableReadProviders.binanceChainTest]:
    'https://rpc.ankr.com/bsc_testnet_chapel',
  [AvailableReadProviders.ftmOpera]: 'https://rpc.ankr.com/fantom',
  [AvailableReadProviders.ftmTestnet]: 'https://rpc.ankr.com/fantom_testnet',
  [AvailableReadProviders.mumbai]: 'https://matic-mumbai.chainstacklabs.com',
  [AvailableReadProviders.polygon]: 'https://polygon-rpc.com',
  [AvailableReadProviders.gnosis]: 'https://rpc.ankr.com/gnosis',
  [AvailableReadProviders.sokol]: 'https://sokol.poa.network',
  [AvailableReadProviders.xdc]: 'https://rpc.xinfin.network',
  [AvailableReadProviders.xdcTestnet]: 'https://rpc.apothem.network',
};

export interface IProviders {
  [AvailableWriteProviders.ethCompatible]: Web3KeyWriteProvider;
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
  [AvailableReadProviders.gnosis]: Web3KeyReadProvider;
  [AvailableReadProviders.sokol]: Web3KeyReadProvider;
  [AvailableReadProviders.xdc]: Web3KeyReadProvider;
  [AvailableReadProviders.xdcTestnet]: Web3KeyReadProvider;
}

export type IProvidersMap = IProviders & IExtraProviders;
export type IExtraProviders = Partial<{ [key: string]: IProvider }>;
export type IPartialRpcUrlsConfig = Partial<
  Record<AvailableReadProviders, string>
>;

export class ProviderManager<ProvidersMap extends IProvidersMap> {
  private providers: Partial<ProvidersMap> = {};

  constructor(
    private web3ModalTheme: ThemeColors,
    private providerOptions?: IProviderOptions,
    private rpcUrls: IPartialRpcUrlsConfig = RPC_URLS,
  ) {}

  addProvider(
    providerId: keyof ProvidersMap,
    provider: ProvidersMap[keyof ProvidersMap],
  ) {
    if (!this.providers[providerId]) {
      this.providers[providerId] = provider;
    }
  }

  async getProvider<ProviderType extends IProvider>(
    providerId: keyof ProvidersMap,
    walletId?: string,
  ) {
    const provider = this.providers[providerId];

    if (provider) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider as unknown as ProviderType;
    }

    switch (providerId) {
      case AvailableWriteProviders.ethCompatible:
        return (await this.getETHWriteProvider(
          walletId,
        )) as unknown as ProviderType;

      default:
        throw new Error(
          `The provider isn't supported: ${providerId.toString()}`,
        );
    }
  }

  async getETHReadProvider(providerId: keyof IProviders) {
    const provider = this.providers[providerId];

    if (provider !== undefined) {
      if (!provider.isConnected()) {
        await provider.connect();
      }

      return provider;
    }

    const rpcUrls = { ...RPC_URLS, ...this.rpcUrls } as Record<
      keyof IProviders,
      string
    >;

    switch (providerId as AvailableReadProviders) {
      case AvailableReadProviders.ethMainnet:
      case AvailableReadProviders.ethGoerli: {
        return new EthereumHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.mumbai:
      case AvailableReadProviders.polygon: {
        return new PolygonHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.avalancheChain:
      case AvailableReadProviders.avalancheChainTest: {
        return new AvalancheHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.binanceChain:
      case AvailableReadProviders.binanceChainTest: {
        return new BinanceHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.ftmOpera:
      case AvailableReadProviders.ftmTestnet: {
        return new FantomHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.gnosis:
      case AvailableReadProviders.sokol: {
        return new GnosisHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      case AvailableReadProviders.xdc:
      case AvailableReadProviders.xdcTestnet: {
        return new XDCHttpWeb3KeyProvider(rpcUrls[providerId]);
      }

      default:
        throw new Error('');
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

  getWriteProviderById(providerId: keyof ProvidersMap) {
    const provider = this.providers[providerId];
    return (provider as Web3KeyWriteProvider) ?? null;
  }

  disconnect(providerId: keyof ProvidersMap) {
    const provider = this.providers[providerId];

    if (provider) {
      provider.disconnect();

      delete this.providers[providerId];
    }
  }
}
