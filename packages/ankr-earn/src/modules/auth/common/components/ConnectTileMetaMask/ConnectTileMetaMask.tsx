import { EWalletId, getWalletName } from '@ankr.com/provider-core';

import { ConnectTile } from '../ConnectTile';

import { ReactComponent as MetaMaskIcon } from './assets/metamask-icon.svg';
import { useConnectTileMetaMask } from './useConnectTileMetaMask';

const DOWNLOAD_METAMASK_URL = 'https://metamask.io/download/';

export const ConnectTileMetaMask = (): JSX.Element => {
  const { isDisabled, isInjected, tooltip, handleClick } =
    useConnectTileMetaMask();

  return (
    <ConnectTile
      href={isInjected ? undefined : DOWNLOAD_METAMASK_URL}
      iconSlot={<MetaMaskIcon />}
      isDisabled={isDisabled}
      title={getWalletName(EWalletId.injected)}
      tooltip={tooltip}
      onClick={handleClick}
    />
  );
};
