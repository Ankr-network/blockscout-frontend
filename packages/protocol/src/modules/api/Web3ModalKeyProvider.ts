import Web3Modal, { ICoreOptions, IProviderOptions } from 'web3modal';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import Web3 from 'web3';
import { fade, lighten } from '@material-ui/core';
import { PALETTE } from '../themes/mainTheme';

export const providerDefaultOptions: IProviderOptions = {};

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
