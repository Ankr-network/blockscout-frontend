import Web3 from 'web3';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';

export class EthereumHttpWeb3KeyProvider extends Web3KeyReadProvider {
  constructor(private url: string) {
    super();

    this.web3 = new Web3();
    const provider = new Web3.providers.HttpProvider(url);
    this.web3.setProvider(provider);
  }
}
