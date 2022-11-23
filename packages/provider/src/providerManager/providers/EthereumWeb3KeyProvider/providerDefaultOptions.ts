import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';
import { getIsCoin98 } from './utils/getIsCoin98';
import { getIsCoin98Injected } from './utils/getIsCoin98Injected';
import {
  getIsTrustWallet,
  getIsTrustWalletInjected,
} from './utils/getIsTrustWallet';
import { RPCConfig } from '../../../utils/const';
import { EEthereumNetworkId, EWalletId } from '../../../utils/types';
import { getWalletIcon } from '../../../utils/getWalletIcon';
import { getWalletName } from '../../../utils/getWalletName';

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
  [EWalletId.coin98]: {
    display: {
      logo: getWalletIcon(EWalletId.coin98),
      name: getWalletName(EWalletId.coin98),
      description: '',
    },
    package: () => null,
    connector: async () => {
      const { coin98 } = window as any;
      if (!getIsCoin98(coin98) || !getIsCoin98Injected()) {
        throw new Error("Coin 98 wallet isn't installed");
      }

      await coin98.provider.request({
        method: 'eth_requestAccounts',
      });

      return coin98.provider;
    },
  },
  [EWalletId.binanceWallet]: {
    display: {
      logo: getWalletIcon(EWalletId.binanceWallet),
      name: getWalletName(EWalletId.binanceWallet),
      description:
        'A Crypto Wallet for BNB Beacon Chain, BNB Smart Chain and Ethereum',
    },
    package: async () => {
      const { BscConnector } = await import('@binance-chain/bsc-connector');
      return BscConnector;
    },
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
      name: getWalletName(EWalletId.imtoken),
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
      name: getWalletName(EWalletId.math),
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
  [EWalletId.trustViaWalletConnect]: {
    display: {
      logo: getWalletIcon(EWalletId.trustViaWalletConnect),
      name: getWalletName(EWalletId.trustViaWalletConnect),
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
  [EWalletId.trust]: {
    display: {
      logo: getWalletIcon(EWalletId.trust),
      name: getWalletName(EWalletId.trust),
      description: 'The most trusted & secure crypto wallet',
    },
    package: () => null,
    connector: async () => {
      const { trustwallet } = window as any;
      if (!getIsTrustWallet(trustwallet) || !getIsTrustWalletInjected()) {
        throw new Error("Trust Wallet isn't installed");
      }

      await trustwallet.request({
        method: 'eth_requestAccounts',
      });

      return trustwallet;
    },
  },
  [EWalletId.huobi]: {
    display: {
      logo: getWalletIcon(EWalletId.huobi),
      name: getWalletName(EWalletId.huobi),
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
      name: getWalletName(EWalletId.coinbase),
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
      name: getWalletName(EWalletId.okxwallet),
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
