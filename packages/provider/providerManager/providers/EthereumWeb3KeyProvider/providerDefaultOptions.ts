import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';
import huobiLogo from './assets/huobi.svg';
import imTokenLogo from './assets/im-token.svg';
import mathLogo from './assets/math.svg';
import trustWalletLogo from './assets/trust.svg';

export const providerDefaultOptions: IProviderOptions = {
  'custom-imtoken': {
    display: {
      logo: imTokenLogo,
      name: 'imToken',
      description: 'Easy and secure digital wallet trusted by millions',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-math': {
    display: {
      logo: mathLogo,
      name: 'Math Wallet',
      description: 'Gateway to the World of Blockchain',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-trust': {
    display: {
      logo: trustWalletLogo,
      name: 'Trust Wallet',
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  'custom-huobi': {
    display: {
      logo: huobiLogo,
      name: 'Huobi Wallet',
      description: 'Multi-currency support, practical and convenient',
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options);
      await provider.enable();
      return provider;
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://eth-03.dccn.ankr.com',
        5: 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
  },
};
