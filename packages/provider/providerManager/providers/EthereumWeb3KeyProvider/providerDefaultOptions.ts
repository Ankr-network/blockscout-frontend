import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';
import { EWalletId } from '../../types';
import huobiLogo from './assets/huobi.svg';
import imTokenLogo from './assets/im-token.svg';
import mathLogo from './assets/math.svg';
import trustWalletLogo from './assets/trust.svg';

export const providerDefaultOptions: IProviderOptions = {
  [EWalletId.imtoken]: {
    display: {
      logo: imTokenLogo,
      name: 'imToken',
      description: 'Easy and secure digital wallet trusted by millions',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://rpc.ankr.com/eth',
        5: 'https://eth-goerli-01.dccn.ankr.com',
        56: 'https://rpc.ankr.com/bsc',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.math]: {
    display: {
      logo: mathLogo,
      name: 'Math Wallet',
      description: 'Gateway to the World of Blockchain',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://rpc.ankr.com/eth',
        5: 'https://eth-goerli-01.dccn.ankr.com',
        56: 'https://rpc.ankr.com/bsc',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.trust]: {
    display: {
      logo: trustWalletLogo,
      name: 'Trust Wallet',
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://rpc.ankr.com/eth',
        5: 'https://eth-goerli-01.dccn.ankr.com',
        56: 'https://rpc.ankr.com/bsc',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.huobi]: {
    display: {
      logo: huobiLogo,
      name: 'Huobi Wallet',
      description: 'Multi-currency support, practical and convenient',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://rpc.ankr.com/eth',
        5: 'https://eth-goerli-01.dccn.ankr.com',
        56: 'https://rpc.ankr.com/bsc',
      },
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
      rpc: {
        1: 'https://rpc.ankr.com/eth',
        5: 'https://eth-goerli-01.dccn.ankr.com',
        56: 'https://rpc.ankr.com/bsc',
      },
    },
  },
};
