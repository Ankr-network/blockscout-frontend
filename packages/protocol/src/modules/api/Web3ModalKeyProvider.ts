import Web3Modal, { ICoreOptions, IProviderOptions } from 'web3modal';
import Web3 from 'web3';
import { fade, lighten } from '@material-ui/core';
import { PALETTE } from 'ui';

export const providerDefaultOptions: IProviderOptions = {};

export const injectWeb3Modal = async (): Promise<Web3> => {
  const web3Modal = new Web3Modal({
    providerOptions: providerDefaultOptions,
    theme: {
      background: PALETTE.background?.default,
      main: PALETTE.text?.primary,
      secondary: PALETTE.text?.primary && fade(PALETTE.text.primary, 0.5),
      border: PALETTE.background?.paper,
      hover:
        PALETTE.background?.default &&
        lighten(PALETTE.background.default, 0.03),
    },
  } as ICoreOptions);
  return new Web3(await web3Modal.connect());
};
