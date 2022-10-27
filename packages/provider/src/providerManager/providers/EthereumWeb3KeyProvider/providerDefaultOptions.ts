import { BscConnector } from '@binance-chain/bsc-connector';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';

import {
  EEthereumNetworkId,
  EWalletId,
  getWalletIcon,
  OKX_WALLET_NAME,
  RPCConfig,
} from '@ankr.com/provider-core';

const DEFAULT_RPC = Object.entries(RPCConfig).reduce(
  (acc, [key, { rpcUrls }]) => ({ ...acc, [key]: rpcUrls[0] }),
  {} as Record<EEthereumNetworkId, string>,
);

const AUTH_STORAGE_KEY = 'persist:auth';

function parseAuthChainId(): EEthereumNetworkId | undefined {
  const authPersistData = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!authPersistData) {
    return undefined;
  }

  try {
    const data = JSON.parse(authPersistData);
    const { chainId } = JSON.parse(data.ethCompatible);
    return chainId;
  } catch (error) {
    return undefined;
  }
}

export const providerDefaultOptions: IProviderOptions = {
  [EWalletId.binanceWallet]: {
    display: {
      logo: getWalletIcon(EWalletId.binanceWallet),
      name: 'Binance Wallet',
      description:
        'A Crypto Wallet for BNB Beacon Chain, BNB Smart Chain and Ethereum',
    },
    package: BscConnector,
    connector: async (ProviderPackage: any) => {
      const bsc = new ProviderPackage({
        supportedChainIds: [
          EEthereumNetworkId.smartchain,
          EEthereumNetworkId.smartchainTestnet,
        ],
      });

      const activate = await bsc.activate();

      return activate.provider;
    },
  },
  [EWalletId.imtoken]: {
    display: {
      logo: getWalletIcon(EWalletId.imtoken),
      name: 'imToken',
      description: 'Easy and secure digital wallet trusted by millions',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.math]: {
    display: {
      logo: getWalletIcon(EWalletId.math),
      name: 'Math Wallet',
      description: 'Gateway to the World of Blockchain',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.trust]: {
    display: {
      logo: getWalletIcon(EWalletId.trust),
      name: 'Trust Wallet',
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.huobi]: {
    display: {
      logo: getWalletIcon(EWalletId.huobi),
      name: 'Huobi Wallet',
      description: 'Multi-currency support, practical and convenient',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.walletconnect]: {
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
  },
  [EWalletId.coinbase]: {
    display: {
      logo: getWalletIcon(EWalletId.coinbase),
      name: 'Coinbase',
      description: 'Coinbase wallet',
    },
    package: CoinbaseWalletSDK,
    options: {
      appName: 'App',
      rpc: DEFAULT_RPC,
      reloadOnDisconnect: false,
    },
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const lastChainId = parseAuthChainId();

      const coinbase = new CoinbaseWalletSDK({
        appName,
        reloadOnDisconnect: false,
      });
      const provider = coinbase.makeWeb3Provider(
        lastChainId ? DEFAULT_RPC[lastChainId] : networkUrl,
        lastChainId ?? chainId,
      );
      await provider.enable();

      return provider;
    },
  },
  [EWalletId.okxwallet]: {
    display: {
      logo: getWalletIcon(EWalletId.okxwallet),
      name: OKX_WALLET_NAME,
      description: 'Your portal to Web3',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async () => {
      const provider = window.okexchain;
      await (provider as any).enable();
      return provider;
    },
  },
};
