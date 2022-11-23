import Web3 from 'web3';
import Web3Modal, { IProviderOptions, ThemeColors } from 'web3modal';
import { providerDefaultOptions } from './providerDefaultOptions';
import { Web3KeyWriteProvider } from '../../../utils/Web3KeyWriteProvider';

interface IEthereumWeb3KeyProviderArgs {
  web3ModalTheme: ThemeColors;
}

export class EthereumWeb3KeyProvider extends Web3KeyWriteProvider {
  private web3ModalTheme: ThemeColors;

  constructor({ web3ModalTheme }: IEthereumWeb3KeyProviderArgs) {
    super();
    this.web3ModalTheme = web3ModalTheme;
  }

  async inject(walletId?: string, providerOptions?: IProviderOptions) {
    if (!providerOptions) {
      providerOptions = providerDefaultOptions;
    }

    // create Web3Modal instance
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: this.web3ModalTheme,
    });

    try {
      // if cancel a request in walletconnect promise will not be fulfilled
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
