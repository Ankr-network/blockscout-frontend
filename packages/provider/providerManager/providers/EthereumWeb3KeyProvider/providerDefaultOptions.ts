import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';
import { EEthereumNetworkId, EWalletId } from '../../types';
import { BscConnector } from '@binance-chain/bsc-connector';
import { OKX_WALLET_NAME, RPCConfig } from '../../const';
import { getWalletIcon } from '../../utils/getWalletIcon';

const DEFAULT_RPC = Object.entries(RPCConfig).reduce(
  (acc, [key, { rpcUrls }]) => ({ ...acc, [key]: rpcUrls[0] }),
  {} as Record<EEthereumNetworkId, string>,
);

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
