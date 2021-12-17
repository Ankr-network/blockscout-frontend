import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { alpha, lighten } from '@material-ui/core';
import { limitConcurrency } from 'limit-concurrency-decorator';
import Web3 from 'web3';
import Web3Modal, { ICoreOptions } from 'web3modal';
import { PALETTE } from '../themes/mainTheme';
import { providerDefaultOptions } from './provider';

export class Web3ModalKeyProvider extends Web3KeyProvider {
  @limitConcurrency(1)
  public async connectFromInjected(): Promise<void> {
    if (this.isConnected()) return;

    const web3Modal = new Web3Modal({
      providerOptions: providerDefaultOptions,
      theme: {
        background: PALETTE.background?.paper ?? '',
        main: PALETTE.text?.primary ?? '',
        secondary: alpha(PALETTE.text?.primary ?? '', 0.5),
        border: PALETTE.background?.default ?? '',
        hover: lighten(PALETTE.background?.paper ?? '', 0.03),
      },
    } as ICoreOptions);

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    return await this.connect(web3 as any); // Temporary any
  }
}
