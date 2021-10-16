import Web3Modal, { ICoreOptions, IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import Web3 from 'web3';
import { fade, lighten } from '@material-ui/core';
import { PALETTE } from '../themes/mainTheme';
import imTokenLogo from './assets/imToken.svg';
import mathLogo from './assets/math.svg';
import trustWalletLogo from './assets/trust.svg';
import huobiLogo from './assets/huobi.svg';

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

export const injectWeb3Modal = async (): Promise<Web3> => {
  const web3Modal = new Web3Modal({
    providerOptions: providerDefaultOptions,
    theme: {
      background: PALETTE.background?.paper,
      main: PALETTE.text?.primary,
      secondary: PALETTE.text?.primary && fade(PALETTE.text.primary, 0.5),
      border: PALETTE.background?.default,
      hover:
        PALETTE.background?.paper && lighten(PALETTE.background.paper, 0.03),
    },
  } as ICoreOptions);
  return new Web3(await web3Modal.connect());
};

export class Web3ModalKeyProvider extends Web3KeyProvider {
  public async inject(): Promise<Web3> {
    if (!this._web3) {
      this._web3 = await injectWeb3Modal();
    }
    return this._web3;
  }
}
