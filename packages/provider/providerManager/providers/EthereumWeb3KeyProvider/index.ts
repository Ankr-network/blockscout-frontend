import Web3 from 'web3';
import Web3Modal, { ThemeColors } from 'web3modal';
import { Web3KeyWriteProvider } from '../../Web3KeyWriteProvider';
import { providerDefaultOptions } from './providerDefaultOptions';

interface IEthereumWeb3KeyProviderArgs {
  web3ModalTheme: ThemeColors;
}

export class EthereumWeb3KeyProvider extends Web3KeyWriteProvider {
  private web3ModalTheme: ThemeColors;

  constructor({ web3ModalTheme }: IEthereumWeb3KeyProviderArgs) {
    super();
    this.web3ModalTheme = web3ModalTheme;
  }

  async inject(walletId?: string, providerOptions = providerDefaultOptions) {
    // create Web3Modal instance
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: this.web3ModalTheme,
    });

    try {
      // get provider after user selects the provider and grants access
      this.provider = walletId
        ? await web3Modal.connectTo(walletId)
        : await web3Modal.connect();

      // inject web3
      this.web3 = new Web3(this.provider);
    } catch (error) {
      throw new Error(
        `Unable to connect. Please check if the connection has already been requested.`,
      );
    }
  }
}
