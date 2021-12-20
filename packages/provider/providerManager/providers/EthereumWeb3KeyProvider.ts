import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal, { IProviderOptions, ThemeColors } from 'web3modal';
import { Web3KeyProvider } from '../Web3KeyProvider';

interface IEthereumWeb3KeyProviderArgs {
  web3ModalTheme: ThemeColors;
}

export class EthereumWeb3KeyProvider extends Web3KeyProvider {
  private web3ModalTheme: ThemeColors;

  constructor({ web3ModalTheme }: IEthereumWeb3KeyProviderArgs) {
    super();
    this.web3ModalTheme = web3ModalTheme;
  }

  async inject() {
    const providerOptions: IProviderOptions = {
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

    // create Web3Modal instance
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: this.web3ModalTheme,
    });

    // get provider after user selects the provider and grants access
    const provider = await web3Modal.connect();
    this.provider = provider;

    // inject web3
    this.web3 = new Web3(provider);
  }
}
