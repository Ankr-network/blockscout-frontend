import Web3 from 'web3';
import Web3Modal, { ThemeColors } from 'web3modal';
import { Web3KeyProvider } from '../../Web3KeyProvider';
import { providerDefaultOptions } from './providerDefaultOptions';

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
    // create Web3Modal instance
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        // TODO: Please remove it after the release
        walletconnect: providerDefaultOptions.walletconnect,
      },
      theme: this.web3ModalTheme,
    });

    // get provider after user selects the provider and grants access
    const provider = await web3Modal.connect();
    this.provider = provider;

    // inject web3
    this.web3 = new Web3(provider);
  }
}
